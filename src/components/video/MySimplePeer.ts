const errCode = require("err-code");
const { Buffer } = require("buffer");

// https://stackoverflow.com/a/75259983/11593686
function getRandomHex(length: number) {
	const bytes = crypto.getRandomValues(new Uint8Array(length));
	return Array.from(bytes).map(el => el.toString(16).padStart(2, "0")).join("");
}

const MAX_BUFFERED_AMOUNT = 64 * 1024;
const ICECOMPLETE_TIMEOUT = 5 * 1000;
const CHANNEL_CLOSING_TIMEOUT = 5 * 1000;

// HACK: Filter trickle lines when trickle is disabled #354
function filterTrickle(signalData: string) {
	return signalData.replace(/a=ice-options:trickle\s\n/g, "");
}

const rtcConfiguration: RTCConfiguration = {
	iceServers: [
		{
			urls: [
				"stun:stun.l.google.com:19302",
				"stun:global.stun.twilio.com:3478",
			],
		},
	],
};

interface PeerOptions {
	initiator?: boolean;
	streams: MediaStream[];
}

// based on https://github.com/feross/simple-peer by Feross Aboukhadijeh, with MIT License.
export class Peer extends EventTarget {
	public readable: ReadableStream;
	public writable: WritableStream;

	private id: string = getRandomHex(4);
	private channelName: string | null;
	private readonly initiator: boolean;
	private streams: MediaStream[];

	private channelConfig: unknown = {};
	private channelNegotiated = undefined;
	private offerOptions: unknown = {};
	private answerOptions: unknown = {};
	private sdpTransform = (sdp: unknown) => sdp;
	private trickle = true;
	private allowHalfTrickle = false;
	private iceCompleteTimeout = ICECOMPLETE_TIMEOUT;

	private destroyed = false;
	private destroying = false;
	private _connected = false;

	public remoteAddress: unknown = undefined;
	public remoteFamily: unknown = undefined;
	public remotePort: unknown = undefined;
	public localAddress: string | undefined = undefined;
	public localFamily: "IPv6" | "IPv4" | undefined = undefined;
	public localPort: number | undefined = undefined;

	private _pcReady = false;
	private _channelReady = false;
	/**
	 * ice candidate trickle done (got null candidate)
	 */
	private _iceComplete = false;
	/**
	 * send an offer/answer anyway after some timeout
	 */
	private _iceCompleteTimer = null;
	private _channel: RTCDataChannel | undefined = undefined;
	private _pendingCandidates = [];

	/**
	 * is this peer waiting for negotiation to complete?
	 */
	private _isNegotiating = false;
	private _firstNegotiation = true;
	/**
	 * batch synchronous negotiations
	 */
	private _batchedNegotiation = false;
	/**
	 * is there a queued negotiation request?
	 */
	private _queuedNegotiation = false;
	private _sendersAwaitingStable = [];
	private _senderMap = new Map();
	private _closingInterval = null;

	private _remoteTracks = [];
	private _remoteStreams = [];

	private _chunk = null;
	private _cb = null;
	private _interval = null;

	private _pc: RTCPeerConnection | undefined;

	private _onFinishBound: (() => void) | undefined = undefined;

	constructor(options: PeerOptions) {
		super();

		this.debug("new peer", options);

		this.readable = new ReadableStream();
		this.writable = new WritableStream();

		this.channelName = options.initiator
			? getRandomHex(20)
			: null;

		this.initiator = options.initiator || false;
		this.streams = options.streams;

		try {
			this._pc = new RTCPeerConnection(rtcConfiguration);
		} catch (err) {
			this.destroy(errCode(err, "ERR_PC_CONSTRUCTOR"));
			return;
		}

		this._pc.oniceconnectionstatechange = () => {
			this._onIceStateChange();
		};
		this._pc.onicegatheringstatechange = () => {
			this._onIceStateChange();
		};
		this._pc.onconnectionstatechange = () => {
			this._onConnectionStateChange();
		};
		this._pc.onsignalingstatechange = () => {
			this._onSignalingStateChange();
		};
		this._pc.onicecandidate = event => {
			this._onIceCandidate(event);
		};
		// Other spec events, unused by this implementation:
		// - onicecandidateerror
		// - onfingerprintfailure
		// - onnegotiationneeded

		catchFirefoxPeerIdentityRejections(this._pc, (error: unknown) => {
			this.destroy(errCode(error, "ERR_PC_PEER_IDENTITY"));
		});

		if (this.initiator || this.channelNegotiated) {
			this._setupData({
				// todo: this is sus
				channel: this._pc.createDataChannel(this.channelName, this.channelConfig),
			});
		} else {
			this._pc.ondatachannel = event => {
				this._setupData(event);
			};
		}

		if (this.streams) {
			this.streams.forEach(stream => {
				this.addStream(stream);
			});
		}
		this._pc.ontrack = event => {
			this._onTrack(event);
		};

		this.debug("initial negotiation");
		this._needsNegotiation();

		this._onFinishBound = () => {
			this._onFinish();
		};

		this.addEventListener("finish", this._onFinishBound, { once: true });
	}

	// HACK: it's possible channel.readyState is "closing" before peer.destroy() fires
	// https://bugs.chromium.org/p/chromium/issues/detail?id=882743
	get connected(): boolean {
		return (this._connected && this._channel != null && this._channel.readyState === "open");
	}

	address(): {
		port: number | undefined;
		family: "IPv6" | "IPv4" | unknown;
		address: string | undefined;
	} {
		return { port: this.localPort, family: this.localFamily, address: this.localAddress };
	}

	signal(data) {
		if (this.destroying) {
			this.debug("Signal called while destroying");
			return;
		}
		if (this.destroyed) {
			throw errCode(new Error("cannot signal after peer is destroyed"), "ERR_DESTROYED");
		}

		if (typeof data === "string") {
			try {
				data = JSON.parse(data);
			} catch (error: unknown) {
				this.debug("Error parsing signal json", error);
				data = {};
			}
		}

		if (data.renegotiate && this.initiator) {
			this.debug("got request to renegotiate");
			this._needsNegotiation();
		}
		if (data.transceiverRequest && this.initiator) {
			this.debug("got request for transceiver");
			this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init);
		}
		if (data.candidate) {
			if (this._pc.remoteDescription && this._pc.remoteDescription.type) {
				this._addIceCandidate(this._pc, data.candidate);
			} else {
				this._pendingCandidates.push(data.candidate);
			}
		}
		if (data.sdp) {
			this._pc.setRemoteDescription(new RTCSessionDescription(data))
				.then(() => {
					if (this.destroyed) return;

					this._pendingCandidates.forEach(candidate => {
						this._addIceCandidate(this._pc, candidate);
					});
					this._pendingCandidates = [];

					if (this._pc.remoteDescription.type === "offer") this._createAnswer();
				})
				.catch(err => {
					this.destroy(errCode(err, "ERR_SET_REMOTE_DESCRIPTION"));
				});
		}
		if (!data.sdp && !data.candidate && !data.renegotiate && !data.transceiverRequest) {
			this.destroy(
				errCode(new Error("signal() called with invalid signal data"), "ERR_SIGNALING"),
			);
		}
	}

	private _addIceCandidate(connection: RTCPeerConnection, candidate: RTCIceCandidateInit) {
		const iceCandidateObj = new RTCIceCandidate(candidate);
		connection.addIceCandidate(iceCandidateObj)
			.catch(err => {
				if (!iceCandidateObj.address || iceCandidateObj.address.endsWith(".local")) {
					console.warn("Ignoring unsupported ICE candidate.");
				} else {
					this.destroy(errCode(err, "ERR_ADD_ICE_CANDIDATE"));
				}
			});
	}

	/**
	 * Send text/binary data to the remote peer.
	 * @param {ArrayBufferView|ArrayBuffer|Buffer|string|Blob} chunk
	 */
	send(chunk) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(new Error("cannot send after peer is destroyed"), "ERR_DESTROYED");
		}
		this._channel.send(chunk);
	}

	/**
	 * Add a Transceiver to the connection.
	 * @param {String} kind
	 * @param {Object} init
	 */
	addTransceiver(kind, init) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(
				new Error("cannot addTransceiver after peer is destroyed"),
				"ERR_DESTROYED",
			);
		}
		this.debug("addTransceiver()");

		if (this.initiator) {
			try {
				this._pc.addTransceiver(kind, init);
				this._needsNegotiation();
			} catch (err) {
				this.destroy(errCode(err, "ERR_ADD_TRANSCEIVER"));
			}
		} else {
			this.emit("signal", { // request initiator to renegotiate
				type: "transceiverRequest",
				transceiverRequest: { kind, init },
			});
		}
	}

	/**
	 * Add a MediaStream to the connection.
	 * @param {MediaStream} stream
	 */
	addStream(stream) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(new Error("cannot addStream after peer is destroyed"), "ERR_DESTROYED");
		}
		this.debug("addStream()");

		stream.getTracks().forEach(track => {
			this.addTrack(track, stream);
		});
	}

	/**
	 * Add a MediaStreamTrack to the connection.
	 * @param {MediaStreamTrack} track
	 * @param {MediaStream} stream
	 */
	addTrack(track, stream) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(new Error("cannot addTrack after peer is destroyed"), "ERR_DESTROYED");
		}
		this.debug("addTrack()");

		const submap = this._senderMap.get(track) || new Map(); // nested Maps map [track, stream] to sender
		let sender = submap.get(stream);
		if (!sender) {
			sender = this._pc.addTrack(track, stream);
			submap.set(stream, sender);
			this._senderMap.set(track, submap);
			this._needsNegotiation();
		} else if (sender.removed) {
			throw errCode(
				new Error(
					"Track has been removed. You should enable/disable tracks that you want to re-add.",
				),
				"ERR_SENDER_REMOVED",
			);
		} else {
			throw errCode(
				new Error("Track has already been added to that stream."),
				"ERR_SENDER_ALREADY_ADDED",
			);
		}
	}

	/**
	 * Replace a MediaStreamTrack by another in the connection.
	 * @param {MediaStreamTrack} oldTrack
	 * @param {MediaStreamTrack} newTrack
	 * @param {MediaStream} stream
	 */
	replaceTrack(oldTrack, newTrack, stream) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(
				new Error("cannot replaceTrack after peer is destroyed"),
				"ERR_DESTROYED",
			);
		}
		this.debug("replaceTrack()");

		const submap = this._senderMap.get(oldTrack);
		const sender = submap ? submap.get(stream) : null;
		if (!sender) {
			throw errCode(
				new Error("Cannot replace track that was never added."),
				"ERR_TRACK_NOT_ADDED",
			);
		}
		if (newTrack) this._senderMap.set(newTrack, submap);

		if (sender.replaceTrack != null) {
			sender.replaceTrack(newTrack);
		} else {
			this.destroy(
				errCode(
					new Error("replaceTrack is not supported in this browser"),
					"ERR_UNSUPPORTED_REPLACETRACK",
				),
			);
		}
	}

	/**
	 * Remove a MediaStreamTrack from the connection.
	 * @param {MediaStreamTrack} track
	 * @param {MediaStream} stream
	 */
	removeTrack(track, stream) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(new Error("cannot removeTrack after peer is destroyed"), "ERR_DESTROYED");
		}
		this.debug("removeSender()");

		const submap = this._senderMap.get(track);
		const sender = submap ? submap.get(stream) : null;
		if (!sender) {
			throw errCode(
				new Error("Cannot remove track that was never added."),
				"ERR_TRACK_NOT_ADDED",
			);
		}
		try {
			sender.removed = true;
			this._pc.removeTrack(sender);
		} catch (err) {
			if (err.name === "NS_ERROR_UNEXPECTED") {
				this._sendersAwaitingStable.push(sender); // HACK: Firefox must wait until (signalingState === stable) https://bugzilla.mozilla.org/show_bug.cgi?id=1133874
			} else {
				this.destroy(errCode(err, "ERR_REMOVE_TRACK"));
			}
		}
		this._needsNegotiation();
	}

	/**
	 * Remove a MediaStream from the connection.
	 * @param {MediaStream} stream
	 */
	removeStream(stream) {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(
				new Error("cannot removeStream after peer is destroyed"),
				"ERR_DESTROYED",
			);
		}
		this.debug("removeSenders()");

		stream.getTracks().forEach(track => {
			this.removeTrack(track, stream);
		});
	}

	_needsNegotiation() {
		this.debug("_needsNegotiation");
		if (this._batchedNegotiation) return; // batch synchronous renegotiations
		this._batchedNegotiation = true;
		queueMicrotask(() => {
			this._batchedNegotiation = false;
			if (this.initiator || !this._firstNegotiation) {
				this.debug("starting batched negotiation");
				this.negotiate();
			} else {
				this.debug("non-initiator initial negotiation request discarded");
			}
			this._firstNegotiation = false;
		});
	}

	negotiate() {
		if (this.destroying) return;
		if (this.destroyed) {
			throw errCode(new Error("cannot negotiate after peer is destroyed"), "ERR_DESTROYED");
		}

		if (this.initiator) {
			if (this._isNegotiating) {
				this._queuedNegotiation = true;
				this.debug("already negotiating, queueing");
			} else {
				this.debug("start negotiation");
				setTimeout(() => { // HACK: Chrome crashes if we immediately call createOffer
					this._createOffer();
				}, 0);
			}
		} else {
			if (this._isNegotiating) {
				this._queuedNegotiation = true;
				this.debug("already negotiating, queueing");
			} else {
				this.debug("requesting negotiation from initiator");
				this.emit("signal", { // request initiator to renegotiate
					type: "renegotiate",
					renegotiate: true,
				});
			}
		}
		this._isNegotiating = true;
	}

	// TODO: Delete this method once readable-stream is updated to contain a default
	// implementation of destroy() that automatically calls _destroy()
	// See: https://github.com/nodejs/readable-stream/issues/283
	destroy(err) {
		this._destroy(err, () => {});
	}

	_destroy(err, cb) {
		if (this.destroyed || this.destroying) return;
		this.destroying = true;

		this.debug("destroying (error: %s)", err && (err.message || err));

		queueMicrotask(() => { // allow events concurrent with the call to _destroy() to fire (see #692)
			this.destroyed = true;
			this.destroying = false;

			this.debug("destroy (error: %s)", err && (err.message || err));

			this.readable = this.writable = false;

			if (!this._readableState.ended) this.push(null);
			if (!this._writableState.finished) this.end();

			this._connected = false;
			this._pcReady = false;
			this._channelReady = false;
			this._remoteTracks = null;
			this._remoteStreams = null;
			this._senderMap = null;

			clearInterval(this._closingInterval);
			this._closingInterval = null;

			clearInterval(this._interval);
			this._interval = null;
			this._chunk = null;
			this._cb = null;

			if (this._onFinishBound) {
				this.removeEventListener("finish", this._onFinishBound);
			}
			this._onFinishBound = undefined;

			if (this._channel) {
				try {
					this._channel.close();
				} catch (error: unknown) {
					this.debug("Error closing channel", error);
				}

				// allow events concurrent with destruction to be handled
				this._channel.onmessage = null;
				this._channel.onopen = null;
				this._channel.onclose = null;
				this._channel.onerror = null;
			}
			if (this._pc) {
				try {
					this._pc.close();
				} catch (err) {}

				// allow events concurrent with destruction to be handled
				this._pc.oniceconnectionstatechange = null;
				this._pc.onicegatheringstatechange = null;
				this._pc.onsignalingstatechange = null;
				this._pc.onicecandidate = null;
				this._pc.ontrack = null;
				this._pc.ondatachannel = null;
			}
			this._pc = null;
			this._channel = undefined;

			if (err) this.emit("error", err);
			this.emit("close");
			cb();
		});
	}

	_setupData(event) {
		if (!event.channel) {
			// In some situations `pc.createDataChannel()` returns `undefined` (in wrtc),
			// which is invalid behavior. Handle it gracefully.
			// See: https://github.com/feross/simple-peer/issues/163
			return this.destroy(
				errCode(
					new Error("Data channel event is missing `channel` property"),
					"ERR_DATA_CHANNEL",
				),
			);
		}

		this._channel = event.channel;
		this._channel.binaryType = "arraybuffer";

		if (typeof this._channel.bufferedAmountLowThreshold === "number") {
			this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT;
		}

		this.channelName = this._channel.label;

		this._channel.onmessage = event => {
			this._onChannelMessage(event);
		};
		this._channel.onbufferedamountlow = () => {
			this._onChannelBufferedAmountLow();
		};
		this._channel.onopen = () => {
			this._onChannelOpen();
		};
		this._channel.onclose = () => {
			this._onChannelClose();
		};
		this._channel.onerror = event => {
			const err = event.error instanceof Error
				? event.error
				: new Error(
					`Datachannel error: ${event.message} ${event.filename}:${event.lineno}:${event.colno}`,
				);
			this.destroy(errCode(err, "ERR_DATA_CHANNEL"));
		};

		// HACK: Chrome will sometimes get stuck in readyState "closing", let's check for this condition
		// https://bugs.chromium.org/p/chromium/issues/detail?id=882743
		let isClosing = false;
		this._closingInterval = setInterval(() => { // No "onclosing" event
			if (this._channel && this._channel.readyState === "closing") {
				if (isClosing) this._onChannelClose(); // closing timed out: equivalent to onclose firing
				isClosing = true;
			} else {
				isClosing = false;
			}
		}, CHANNEL_CLOSING_TIMEOUT);
	}

	_read() {}

	_write(chunk, encoding, cb) {
		if (this.destroyed) {
			return cb(
				errCode(new Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"),
			);
		}

		if (this._connected) {
			try {
				this.send(chunk);
			} catch (err) {
				return this.destroy(errCode(err, "ERR_DATA_CHANNEL"));
			}
			if (this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
				this.debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount);
				this._cb = cb;
			} else {
				cb(null);
			}
		} else {
			this.debug("write before connect");
			this._chunk = chunk;
			this._cb = cb;
		}
	}

	// When stream finishes writing, close socket. Half open connections are not
	// supported.
	_onFinish() {
		if (this.destroyed) return;

		// Wait a bit before destroying so the socket flushes.
		// TODO: is there a more reliable way to accomplish this?
		const destroySoon = () => {
			setTimeout(() => this.destroy(), 1000);
		};

		if (this._connected) {
			destroySoon();
		} else {
			this.once("connect", destroySoon);
		}
	}

	_startIceCompleteTimeout() {
		if (this.destroyed) return;
		if (this._iceCompleteTimer) return;
		this.debug("started iceComplete timeout");
		this._iceCompleteTimer = setTimeout(() => {
			if (!this._iceComplete) {
				this._iceComplete = true;
				this.debug("iceComplete timeout completed");
				this.emit("iceTimeout");
				this.emit("_iceComplete");
			}
		}, this.iceCompleteTimeout);
	}

	_createOffer() {
		if (this.destroyed) return;

		this._pc.createOffer(this.offerOptions)
			.then(offer => {
				if (this.destroyed) return;
				if (!this.trickle && !this.allowHalfTrickle) offer.sdp = filterTrickle(offer.sdp);
				offer.sdp = this.sdpTransform(offer.sdp);

				const sendOffer = () => {
					if (this.destroyed) return;
					const signal = this._pc.localDescription || offer;
					this.debug("signal");
					this.emit("signal", {
						type: signal.type,
						sdp: signal.sdp,
					});
				};

				const onSuccess = () => {
					this.debug("createOffer success");
					if (this.destroyed) return;
					if (this.trickle || this._iceComplete) sendOffer();
					else this.once("_iceComplete", sendOffer); // wait for candidates
				};

				const onError = err => {
					this.destroy(errCode(err, "ERR_SET_LOCAL_DESCRIPTION"));
				};

				this._pc.setLocalDescription(offer)
					.then(onSuccess)
					.catch(onError);
			})
			.catch(err => {
				this.destroy(errCode(err, "ERR_CREATE_OFFER"));
			});
	}

	_requestMissingTransceivers() {
		if (this._pc.getTransceivers) {
			this._pc.getTransceivers().forEach(transceiver => {
				if (!transceiver.mid && transceiver.sender.track && !transceiver.requested) {
					transceiver.requested = true; // HACK: Safari returns negotiated transceivers with a null mid
					this.addTransceiver(transceiver.sender.track.kind);
				}
			});
		}
	}

	_createAnswer() {
		if (this.destroyed) return;

		this._pc.createAnswer(this.answerOptions)
			.then(answer => {
				if (this.destroyed) return;
				if (!this.trickle && !this.allowHalfTrickle) answer.sdp = filterTrickle(answer.sdp);
				answer.sdp = this.sdpTransform(answer.sdp);

				const sendAnswer = () => {
					if (this.destroyed) return;
					const signal = this._pc.localDescription || answer;
					this.debug("signal");
					this.emit("signal", {
						type: signal.type,
						sdp: signal.sdp,
					});
					if (!this.initiator) this._requestMissingTransceivers();
				};

				const onSuccess = () => {
					if (this.destroyed) return;
					if (this.trickle || this._iceComplete) sendAnswer();
					else this.once("_iceComplete", sendAnswer);
				};

				const onError = err => {
					this.destroy(errCode(err, "ERR_SET_LOCAL_DESCRIPTION"));
				};

				this._pc.setLocalDescription(answer)
					.then(onSuccess)
					.catch(onError);
			})
			.catch(err => {
				this.destroy(errCode(err, "ERR_CREATE_ANSWER"));
			});
	}

	_onConnectionStateChange() {
		if (this.destroyed) return;
		if (this._pc.connectionState === "failed") {
			this.destroy(errCode(new Error("Connection failed."), "ERR_CONNECTION_FAILURE"));
		}
	}

	_onIceStateChange() {
		if (this.destroyed) return;
		const iceConnectionState = this._pc.iceConnectionState;
		const iceGatheringState = this._pc.iceGatheringState;

		this.debug(
			"iceStateChange (connection: %s) (gathering: %s)",
			iceConnectionState,
			iceGatheringState,
		);
		this.emit("iceStateChange", iceConnectionState, iceGatheringState);

		if (iceConnectionState === "connected" || iceConnectionState === "completed") {
			this._pcReady = true;
			this._maybeReady();
		}
		if (iceConnectionState === "failed") {
			this.destroy(
				errCode(new Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE"),
			);
		}
		if (iceConnectionState === "closed") {
			this.destroy(errCode(new Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"));
		}
	}

	getStats(cb) {
		// statreports can come with a value array instead of properties
		const flattenValues = report => {
			if (Object.prototype.toString.call(report.values) === "[object Array]") {
				report.values.forEach(value => {
					Object.assign(report, value);
				});
			}
			return report;
		};

		// Promise-based getStats() (standard)
		if (this._pc.getStats.length === 0) {
			this._pc.getStats()
				.then(res => {
					const reports = [];
					res.forEach(report => {
						reports.push(flattenValues(report));
					});
					cb(null, reports);
				}, err => cb(err));

			// Single-parameter callback-based getStats() (non-standard)
		} else if (this._pc.getStats.length > 0) {
			this._pc.getStats(res => {
				// If we destroy connection in `connect` callback this code might happen to run when actual connection is already closed
				if (this.destroyed) return;

				const reports = [];
				res.result().forEach(result => {
					const report = {};
					result.names().forEach(name => {
						report[name] = result.stat(name);
					});
					report.id = result.id;
					report.type = result.type;
					report.timestamp = result.timestamp;
					reports.push(flattenValues(report));
				});
				cb(null, reports);
			}, err => cb(err));

			// Unknown browser, skip getStats() since it's anyone's guess which style of
			// getStats() they implement.
		} else {
			cb(null, []);
		}
	}

	_maybeReady() {
		this.debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady);
		if (this._connected || this._connecting || !this._pcReady || !this._channelReady) return;

		this._connecting = true;

		// HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
		const findCandidatePair = () => {
			if (this.destroyed) return;

			this.getStats((err, items) => {
				if (this.destroyed) return;

				// Treat getStats error as non-fatal. It's not essential.
				if (err) items = [];

				const remoteCandidates = {};
				const localCandidates = {};
				const candidatePairs = {};
				let foundSelectedCandidatePair = false;

				items.forEach(item => {
					// TODO: Once all browsers support the hyphenated stats report types, remove
					// the non-hypenated ones
					if (item.type === "remotecandidate" || item.type === "remote-candidate") {
						remoteCandidates[item.id] = item;
					}
					if (item.type === "localcandidate" || item.type === "local-candidate") {
						localCandidates[item.id] = item;
					}
					if (item.type === "candidatepair" || item.type === "candidate-pair") {
						candidatePairs[item.id] = item;
					}
				});

				const setSelectedCandidatePair = selectedCandidatePair => {
					foundSelectedCandidatePair = true;

					let local = localCandidates[selectedCandidatePair.localCandidateId];

					if (local && (local.ip || local.address)) {
						// Spec
						this.localAddress = local.ip || local.address;
						this.localPort = Number(local.port);
					} else if (local && local.ipAddress) {
						// Firefox
						this.localAddress = local.ipAddress;
						this.localPort = Number(local.portNumber);
					} else if (typeof selectedCandidatePair.googLocalAddress === "string") {
						// TODO: remove this once Chrome 58 is released
						local = selectedCandidatePair.googLocalAddress.split(":");
						this.localAddress = local[0];
						this.localPort = Number(local[1]);
					}
					if (this.localAddress) {
						this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4";
					}

					let remote = remoteCandidates[selectedCandidatePair.remoteCandidateId];

					if (remote && (remote.ip || remote.address)) {
						// Spec
						this.remoteAddress = remote.ip || remote.address;
						this.remotePort = Number(remote.port);
					} else if (remote && remote.ipAddress) {
						// Firefox
						this.remoteAddress = remote.ipAddress;
						this.remotePort = Number(remote.portNumber);
					} else if (typeof selectedCandidatePair.googRemoteAddress === "string") {
						// TODO: remove this once Chrome 58 is released
						remote = selectedCandidatePair.googRemoteAddress.split(":");
						this.remoteAddress = remote[0];
						this.remotePort = Number(remote[1]);
					}
					if (this.remoteAddress) {
						this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4";
					}

					this.debug(
						"connect local: %s:%s remote: %s:%s",
						this.localAddress,
						this.localPort,
						this.remoteAddress,
						this.remotePort,
					);
				};

				items.forEach(item => {
					// Spec-compliant
					if (item.type === "transport" && item.selectedCandidatePairId) {
						setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId]);
					}

					// Old implementations
					if (
						(item.type === "googCandidatePair" && item.googActiveConnection === "true")
						|| ((item.type === "candidatepair" || item.type === "candidate-pair")
							&& item.selected)
					) {
						setSelectedCandidatePair(item);
					}
				});

				// Ignore candidate pair selection in browsers like Safari 11 that do not have any local or remote candidates
				// But wait until at least 1 candidate pair is available
				if (
					!foundSelectedCandidatePair
					&& (!Object.keys(candidatePairs).length || Object.keys(localCandidates).length)
				) {
					setTimeout(findCandidatePair, 100);
					return;
				} else {
					this._connecting = false;
					this._connected = true;
				}

				if (this._chunk) {
					try {
						this.send(this._chunk);
					} catch (err) {
						return this.destroy(errCode(err, "ERR_DATA_CHANNEL"));
					}
					this._chunk = null;
					this.debug("sent chunk from \"write before connect\"");

					const cb = this._cb;
					this._cb = null;
					cb(null);
				}

				// If `bufferedAmountLowThreshold` and 'onbufferedamountlow' are unsupported,
				// fallback to using setInterval to implement backpressure.
				if (typeof this._channel.bufferedAmountLowThreshold !== "number") {
					this._interval = setInterval(() => this._onInterval(), 150);
					if (this._interval.unref) this._interval.unref();
				}

				this.debug("connect");
				this.emit("connect");
			});
		};
		findCandidatePair();
	}

	_onInterval() {
		if (!this._cb || !this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
			return;
		}
		this._onChannelBufferedAmountLow();
	}

	_onSignalingStateChange() {
		if (this.destroyed) return;

		if (this._pc.signalingState === "stable") {
			this._isNegotiating = false;

			// HACK: Firefox doesn't yet support removing tracks when signalingState !== 'stable'
			this.debug("flushing sender queue", this._sendersAwaitingStable);
			this._sendersAwaitingStable.forEach(sender => {
				this._pc.removeTrack(sender);
				this._queuedNegotiation = true;
			});
			this._sendersAwaitingStable = [];

			if (this._queuedNegotiation) {
				this.debug("flushing negotiation queue");
				this._queuedNegotiation = false;
				this._needsNegotiation(); // negotiate again
			} else {
				this.debug("negotiated");
				this.emit("negotiated");
			}
		}

		this.debug("signalingStateChange %s", this._pc.signalingState);
		this.emit("signalingStateChange", this._pc.signalingState);
	}

	_onIceCandidate(event) {
		if (this.destroyed) return;
		if (event.candidate && this.trickle) {
			this.emit("signal", {
				type: "candidate",
				candidate: {
					candidate: event.candidate.candidate,
					sdpMLineIndex: event.candidate.sdpMLineIndex,
					sdpMid: event.candidate.sdpMid,
				},
			});
		} else if (!event.candidate && !this._iceComplete) {
			this._iceComplete = true;
			this.emit("_iceComplete");
		}
		// as soon as we've received one valid candidate start timeout
		if (event.candidate) {
			this._startIceCompleteTimeout();
		}
	}

	_onChannelMessage(event) {
		if (this.destroyed) return;
		let data = event.data;
		if (data instanceof ArrayBuffer) data = Buffer.from(data);
		this.push(data);
	}

	_onChannelBufferedAmountLow() {
		if (this.destroyed || !this._cb) return;
		this.debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
		const cb = this._cb;
		this._cb = null;
		cb(null);
	}

	_onChannelOpen() {
		if (this._connected || this.destroyed) return;
		this.debug("on channel open");
		this._channelReady = true;
		this._maybeReady();
	}

	_onChannelClose() {
		if (this.destroyed) return;
		this.debug("on channel close");
		this.destroy();
	}

	_onTrack(event) {
		if (this.destroyed) return;

		event.streams.forEach(eventStream => {
			this.debug("on track");
			this.emit("track", event.track, eventStream);

			this._remoteTracks.push({
				track: event.track,
				stream: eventStream,
			});

			if (
				this._remoteStreams.some(remoteStream => {
					return remoteStream.id === eventStream.id;
				})
			) return; // Only fire one 'stream' event, even though there may be multiple tracks per stream

			this._remoteStreams.push(eventStream);
			queueMicrotask(() => {
				this.debug("on stream");
				this.emit("stream", eventStream); // ensure all tracks have been added
			});
		});
	}

	private debug(...args: unknown[]) {
		console.debug(`[${this.id}]:`, ...args);
	}
}

/**
 *  HACK: Fix for odd Firefox behavior, see: https://github.com/feross/simple-peer/pull/783
 */
function catchFirefoxPeerIdentityRejections(
	pc: RTCPeerConnection,
	onReject: (error: unknown) => void,
) {
	if (
		!("peerIdentity" in pc) || typeof pc.peerIdentity !== "object"
		|| pc.peerIdentity == null || !(pc.peerIdentity instanceof Promise)
	) {
		return;
	}

	pc.peerIdentity.catch(onReject);
}
