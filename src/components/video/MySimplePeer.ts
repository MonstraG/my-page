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

interface CodedError extends Error {
	code: string;
}

function newError(error: Error | string | unknown, code: string): CodedError {
	if (typeof error === "string") {
		return addCodeToError(new Error(error), code);
	}
	if (error instanceof Error) {
		return addCodeToError(error, code);
	}
	return addCodeToError(new Error("unknown error", { cause: error }), code);
}

function addCodeToError(error: Error, code: string): CodedError {
	Object.assign(error, { code });
	return error as CodedError;
}

interface SignalEventTransceiverRequest {
	type: "transceiverRequest";
	transceiverRequest: { kind: string; init: RTCRtpTransceiverInit };
}

/**
 * Request initiator to renegotiate
 */
interface SignalEventRenegotiate {
	type: "renegotiate";
	renegotiate: true;
}

interface SignalEventSignal {
	type: RTCSdpType;
	sdp?: string | undefined;
}

interface SignaEventCandidate {
	type: "candidate";
	candidate: Candidate;
}

type SignalEvent =
	| SignalEventTransceiverRequest
	| SignalEventRenegotiate
	| SignalEventSignal
	| SignaEventCandidate;

interface Candidate {
	candidate: string;
	sdpMLineIndex: number | null;
	sdpMid: string | null;
}

interface MySender extends RTCRtpSender {
	removed?: boolean;
}

// https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#common_instance_properties
interface RTCStatsReportItem extends Record<string, unknown> {
	id: string;
	timestamp: DOMHighResTimeStamp;
	type:
		| "candidate-pair"
		| "inbound-rtp"
		| "certificate"
		| "codec"
		| "data-channel"
		| "local-candidate"
		| "media-source"
		| "outbound-rtp"
		| "peer-connection"
		| "remote-candidate"
		| "remote-inbound-rtp"
		| "remote-outbound-rtp"
		| "transport";
}

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
	private trickle = true;
	private allowHalfTrickle = false;
	private iceCompleteTimeout = ICECOMPLETE_TIMEOUT;

	private destroyed = false;
	private destroying = false;
	private _connected = false;
	private _connecting = false;

	public remoteAddress: string | undefined = undefined;
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
	private _iceCompleteTimer: ReturnType<typeof setTimeout> | undefined = undefined;
	private _channel: RTCDataChannel | undefined = undefined;
	private _pendingCandidates: Candidate[] = [];

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
	private _sendersAwaitingStable: MySender[] = [];
	private _senderMap = new Map<
		MediaStreamTrack,
		Map<MediaStream, MySender>
	>();
	private _closingInterval: ReturnType<typeof setTimeout> | undefined = undefined;

	private _remoteTracks: {
		track: MediaStreamTrack;
		stream: MediaStream;
	}[] = [];
	private _remoteStreams: MediaStream[] = [];

	private _chunk: Blob | string | ArrayBuffer | undefined = undefined;
	private _interval = null;

	private _pc = new RTCPeerConnection(rtcConfiguration);

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
			this.destroy(newError(error, "ERR_PC_PEER_IDENTITY"));
		});

		if (this.initiator || this.channelNegotiated) {
			this._setupData(this._pc.createDataChannel(this.channelName, this.channelConfig));
		} else {
			this._pc.ondatachannel = (event: RTCDataChannelEvent) => {
				this._setupData(event.channel);
			};
		}

		if (this.streams) {
			this.streams.forEach(stream => {
				this.addStream(stream);
			});
		}
		this._pc.ontrack = (event: RTCTrackEvent) => {
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

	signal(
		data:
			| string
			| SignalEvent,
	): void {
		if (this.destroying) {
			this.debug("Signal called while destroying");
			return;
		}
		if (this.destroyed) {
			throw newError("cannot signal after peer is destroyed", "ERR_DESTROYED");
		}

		if (this._pc == null) {
			throw newError("cannot signal, peer connection missing", "ERR_PEER_CONNECTION_MISSING");
		}

		if (typeof data === "string") {
			try {
				this.handleSignal(this._pc, JSON.parse(data));
			} catch (error: unknown) {
				this.destroy(newError(error, "ERR_SIGNALING_BAD_JSON"));
			}
		}
	}

	private handleSignal(peerConnection: RTCPeerConnection, data: SignalEvent) {
		if ("renegotiate" in data && data.renegotiate && this.initiator) {
			this.debug("got request to renegotiate");
			this._needsNegotiation();
		}
		if ("transceiverRequest" in data && data.transceiverRequest && this.initiator) {
			this.debug("got request for transceiver");
			this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init);
		}
		if ("candidate" in data && data.candidate) {
			if (peerConnection.remoteDescription && peerConnection.remoteDescription.type) {
				this.addIceCandidate(peerConnection, data.candidate);
			} else {
				this._pendingCandidates.push(data.candidate);
			}
		}
		if ("sdp" in data && data.sdp) {
			peerConnection.setRemoteDescription(new RTCSessionDescription(data))
				.then(() => {
					if (this.destroyed) return;
					if (this._pc == null) {
						throw newError(
							"cannot handle setting remote description, peer connection missing",
							"ERR_PEER_CONNECTION_MISSING",
						);
					}

					this._pendingCandidates.forEach(candidate => {
						this.addIceCandidate(peerConnection, candidate);
					});
					this._pendingCandidates = [];

					if (!peerConnection.remoteDescription) {
						throw newError(
							"cannot handle setting remote description, peer connection remoteDescription missing",
							"ERR_REMOTE_DESCRIPTION_MISSING",
						);
					}
					if (peerConnection.remoteDescription.type === "offer") this._createAnswer();
				})
				.catch(err => {
					this.destroy(newError(err, "ERR_SET_REMOTE_DESCRIPTION"));
				});
		}

		this.destroy(
			newError("signal() called with invalid signal data", "ERR_SIGNALING_UNKNOWN"),
		);
	}

	private addIceCandidate(connection: RTCPeerConnection, candidate: RTCIceCandidateInit) {
		const iceCandidateObj = new RTCIceCandidate(candidate);
		connection.addIceCandidate(iceCandidateObj)
			.catch(err => {
				if (!iceCandidateObj.address || iceCandidateObj.address.endsWith(".local")) {
					console.warn("Ignoring unsupported ICE candidate.");
				} else {
					this.destroy(newError(err, "ERR_ADD_ICE_CANDIDATE"));
				}
			});
	}

	/**
	 * Send text/binary data to the remote peer.
	 */
	private send(chunk: string | Blob | ArrayBuffer): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError("cannot send after peer is destroyed", "ERR_DESTROYED");
		}
		if (!this._channel) {
			throw newError("cannot send after channel is missing", "ERR_CHANNEL_MISSING");
		}
		if (typeof chunk === "string") {
			this._channel.send(chunk);
			return;
		}
		if (chunk instanceof Blob) {
			this._channel.send(chunk);
			return;
		}

		this._channel.send(chunk);
		return;
	}

	/**
	 * Add a Transceiver to the connection.
	 */
	public addTransceiver(kind: string, init: RTCRtpTransceiverInit): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError(
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
				this.destroy(newError(err, "ERR_ADD_TRANSCEIVER"));
			}
		} else {
			this.emit("signal", {
				type: "transceiverRequest",
				transceiverRequest: { kind, init },
			});
		}
	}

	/**
	 * Add a MediaStream to the connection.
	 */
	public addStream(stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError("cannot addStream after peer is destroyed", "ERR_DESTROYED");
		}
		this.debug("addStream()");

		stream.getTracks().forEach(track => {
			this.addTrack(track, stream);
		});
	}

	/**
	 * Add a MediaStreamTrack to the connection.
	 */
	public addTrack(track: MediaStreamTrack, stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError("cannot addTrack after peer is destroyed", "ERR_DESTROYED");
		}
		this.debug("addTrack()");

		const submap = this._senderMap.get(track) ?? new Map<MediaStream, MySender>();
		let sender = submap.get(stream);
		if (!sender) {
			sender = this._pc.addTrack(track, stream);
			submap.set(stream, sender);
			this._senderMap.set(track, submap);
			this._needsNegotiation();
		} else if (sender.removed) {
			throw newError(
				new Error(
					"Track has been removed. You should enable/disable tracks that you want to re-add.",
				),
				"ERR_SENDER_REMOVED",
			);
		} else {
			throw newError(
				new Error("Track has already been added to that stream."),
				"ERR_SENDER_ALREADY_ADDED",
			);
		}
	}

	/**
	 * Replace a MediaStreamTrack by another in the connection.
	 */
	public replaceTrack(
		oldTrack: MediaStreamTrack,
		newTrack: MediaStreamTrack,
		stream: MediaStream,
	): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError(
				new Error("cannot replaceTrack after peer is destroyed"),
				"ERR_DESTROYED",
			);
		}
		this.debug("replaceTrack()");

		const submap = this._senderMap.get(oldTrack) ?? new Map<MediaStream, MySender>();
		const sender = submap ? submap.get(stream) : null;
		if (!sender) {
			throw newError(
				new Error("Cannot replace track that was never added."),
				"ERR_TRACK_NOT_ADDED",
			);
		}
		if (newTrack) this._senderMap.set(newTrack, submap);

		if (sender.replaceTrack != null) {
			sender.replaceTrack(newTrack);
		} else {
			this.destroy(
				newError(
					new Error("replaceTrack is not supported in this browser"),
					"ERR_UNSUPPORTED_REPLACETRACK",
				),
			);
		}
	}

	/**
	 * Remove a MediaStreamTrack from the connection.
	 */
	public removeTrack(track: MediaStreamTrack, stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError(
				new Error("cannot removeTrack after peer is destroyed"),
				"ERR_DESTROYED",
			);
		}
		this.debug("removeSender()");

		const submap = this._senderMap.get(track);
		const sender = submap ? submap.get(stream) : null;
		if (!sender) {
			throw newError(
				new Error("Cannot remove track that was never added."),
				"ERR_TRACK_NOT_ADDED",
			);
		}
		try {
			sender.removed = true;
			this._pc.removeTrack(sender);
			this._needsNegotiation();
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.name === "NS_ERROR_UNEXPECTED") {
					this._sendersAwaitingStable.push(sender); // HACK: Firefox must wait until (signalingState === stable) https://bugzilla.mozilla.org/show_bug.cgi?id=1133874
					this._needsNegotiation();
				}
			}
			this.destroy(newError(error, "ERR_REMOVE_TRACK"));
		}
	}

	/**
	 * Remove a MediaStream from the connection.
	 */
	public removeStream(stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError(
				new Error("cannot removeStream after peer is destroyed"),
				"ERR_DESTROYED",
			);
		}
		this.debug("removeSenders()");

		stream.getTracks().forEach(track => {
			this.removeTrack(track, stream);
		});
	}

	private _needsNegotiation() {
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

	private negotiate() {
		if (this.destroying) return;
		if (this.destroyed) {
			throw newError("cannot negotiate after peer is destroyed", "ERR_DESTROYED");
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
				const signalEvent: SignalEventRenegotiate = {
					type: "renegotiate",
					renegotiate: true,
				};
				this.emit("signal", signalEvent);
			}
		}
		this._isNegotiating = true;
	}

	private emit(eventType: string, detail: unknown) {
		this.dispatchEvent(new CustomEvent(eventType, { detail: detail }));
	}

	private once(eventType: string, callback: (event: unknown) => void) {
		this.addEventListener(eventType, callback, { once: true });
	}

	destroy(error: Error | undefined): void {
		if (this.destroyed || this.destroying) return;
		this.destroying = true;

		this.debug("destroying (error: %s)", error && (error.message || error));

		queueMicrotask(() => { // allow events concurrent with the call to _destroy() to fire (see #692)
			this.destroyed = true;
			this.destroying = false;

			this.debug("destroy (error: %s)", error && (error.message || error));

			void this.readable.cancel();
			void this.writable.close();

			this._connected = false;
			this._pcReady = false;
			this._channelReady = false;
			this._remoteTracks = [];
			this._remoteStreams = [];
			this._senderMap = new Map<MediaStreamTrack, Map<MediaStream, MySender>>();

			if (this._closingInterval) {
				clearInterval(this._closingInterval);
				this._closingInterval = undefined;
			}
			if (this._interval) {
				clearInterval(this._interval);
				this._interval = null;
			}

			this._chunk = undefined;

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
				} catch (closureError: unknown) {
					console.debug("peerChannel closure error", closureError);
				}

				// allow events concurrent with destruction to be handled
				this._pc.oniceconnectionstatechange = null;
				this._pc.onicegatheringstatechange = null;
				this._pc.onsignalingstatechange = null;
				this._pc.onicecandidate = null;
				this._pc.ontrack = null;
				this._pc.ondatachannel = null;
			}
			this._channel = undefined;

			if (error) {
				this.emit("error", error);
			}
			this.emit("close", undefined);
		});
	}

	private _setupData(channel: RTCDataChannel) {
		this._channel = channel;
		this._channel.binaryType = "arraybuffer";

		this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT;

		this.channelName = this._channel.label;

		this._channel.onmessage = (event: MessageEvent) => {
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
		this._channel.onerror = (event) => {
			const err = event.error instanceof Error
				? event.error
				: new Error(`Datachannel error ${event}`);
			this.destroy(newError(err, "ERR_DATA_CHANNEL"));
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

	// When stream finishes writing, close socket. Half open connections are not
	// supported.
	private _onFinish() {
		if (this.destroyed) return;

		// Wait a bit before destroying so the socket flushes.
		// TODO: is there a more reliable way to accomplish this?
		const destroySoon = () => {
			setTimeout(() => this.destroy(undefined), 1000);
		};

		if (this._connected) {
			destroySoon();
		} else {
			this.once("connect", destroySoon);
		}
	}

	private _startIceCompleteTimeout() {
		if (this.destroyed) return;
		if (this._iceCompleteTimer) return;
		this.debug("started iceComplete timeout");
		this._iceCompleteTimer = setTimeout(() => {
			if (!this._iceComplete) {
				this._iceComplete = true;
				this.debug("iceComplete timeout completed");
				this.emit("iceTimeout", undefined);
				this.emit("_iceComplete", undefined);
			}
		}, this.iceCompleteTimeout);
	}

	private _createOffer() {
		if (this.destroyed) return;

		this._pc.createOffer(this.offerOptions)
			.then(offer => {
				if (this.destroyed) return;
				if (!this.trickle && !this.allowHalfTrickle) offer.sdp = filterTrickle(offer.sdp);

				const sendOffer = () => {
					if (this.destroyed) return;
					const signal = this._pc.localDescription || offer;
					this.debug("signal");
					const signalEvent: SignalEventSignal = {
						type: signal.type,
						sdp: signal.sdp,
					};
					this.emit("signal", signalEvent);
				};

				const onSuccess = () => {
					this.debug("createOffer success");
					if (this.destroyed) return;
					if (this.trickle || this._iceComplete) sendOffer();
					else this.once("_iceComplete", sendOffer); // wait for candidates
				};

				const onError = (err: unknown) => {
					this.destroy(newError(err, "ERR_SET_LOCAL_DESCRIPTION"));
				};

				this._pc.setLocalDescription(offer)
					.then(onSuccess)
					.catch(onError);
			})
			.catch(err => {
				this.destroy(newError(err, "ERR_CREATE_OFFER"));
			});
	}

	private _requestMissingTransceivers() {
		if (this._pc.getTransceivers) {
			this._pc.getTransceivers().forEach(transceiver => {
				if (!transceiver.mid && transceiver.sender.track && !transceiver.requested) {
					transceiver.requested = true; // HACK: Safari returns negotiated transceivers with a null mid
					this.addTransceiver(transceiver.sender.track.kind);
				}
			});
		}
	}

	private _createAnswer() {
		if (this.destroyed) return;

		this._pc.createAnswer(this.answerOptions)
			.then(answer => {
				if (this.destroyed) return;
				if (!this.trickle && !this.allowHalfTrickle) answer.sdp = filterTrickle(answer.sdp);

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

				const onError = (err: unknown) => {
					this.destroy(newError(err, "ERR_SET_LOCAL_DESCRIPTION"));
				};

				this._pc.setLocalDescription(answer)
					.then(onSuccess)
					.catch(onError);
			})
			.catch(err => {
				this.destroy(newError(err, "ERR_CREATE_ANSWER"));
			});
	}

	private _onConnectionStateChange() {
		if (this.destroyed) return;
		if (this._pc.connectionState === "failed") {
			this.destroy(newError("Connection failed.", "ERR_CONNECTION_FAILURE"));
		}
	}

	private _onIceStateChange() {
		if (this.destroyed) return;
		const iceConnectionState = this._pc.iceConnectionState;
		const iceGatheringState = this._pc.iceGatheringState;

		this.debug(
			"iceStateChange (connection: %s) (gathering: %s)",
			iceConnectionState,
			iceGatheringState,
		);
		this.emit("iceStateChange", { iceConnectionState, iceGatheringState });

		if (iceConnectionState === "connected" || iceConnectionState === "completed") {
			this._pcReady = true;
			this._maybeReady();
		}
		if (iceConnectionState === "failed") {
			this.destroy(
				newError("Ice connection failed.", "ERR_ICE_CONNECTION_FAILURE"),
			);
		}
		if (iceConnectionState === "closed") {
			this.destroy(
				newError("Ice connection closed.", "ERR_ICE_CONNECTION_CLOSED"),
			);
		}
	}

	private getStats(): Promise<{ reports: RTCStatsReportItem[] } | { error: unknown }> {
		return this._pc.getStats()
			.then(stats => {
				const reports: RTCStatsReportItem[] = [];
				stats.forEach((report: RTCStatsReportItem) => {
					reports.push(report);
				});
				return { reports };
			})
			.catch((error: unknown) => ({ error }));
	}

	private _maybeReady() {
		this.debug(`maybeReady pc ${this._pcReady} channel ${this._channelReady}`);
		if (this._connected || this._connecting || !this._pcReady || !this._channelReady) return;

		this._connecting = true;

		// HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
		const findCandidatePair = () => {
			if (this.destroyed) return;

			this.getStats().then((result) => {
				if (this.destroyed) return;

				// Treat getStats error as non-fatal. It's not essential.
				const items = "reports" in result ? result.reports : [];

				const remoteCandidates: Record<string, RTCStatsReportItem> = {};
				const localCandidates: Record<string, RTCStatsReportItem> = {};
				const candidatePairs: Record<string, RTCStatsReportItem> = {};
				let foundSelectedCandidatePair = false;

				items.forEach(item => {
					if (item.type === "remote-candidate") {
						remoteCandidates[item.id] = item;
					}
					if (item.type === "local-candidate") {
						localCandidates[item.id] = item;
					}
					if (item.type === "candidate-pair") {
						candidatePairs[item.id] = item;
					}
				});

				const setSelectedCandidatePair = (selectedCandidatePair: RTCStatsReportItem) => {
					foundSelectedCandidatePair = true;

					const local = localCandidates[selectedCandidatePair.localCandidateId as string];
					if (local) {
						this.localAddress = (local.ip || local.address || local.ipAddress) as
							| string
							| undefined;
						this.localPort = Number(local.port) || Number(local.portNumber);
					}
					if (this.localAddress) {
						this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4";
					}

					const remote =
						remoteCandidates[selectedCandidatePair.remoteCandidateId as string];
					if (remote) {
						// Spec
						this.remoteAddress = (remote.ip || remote.address || remote.ipAddress) as
							| string
							| undefined;
						this.remotePort = Number(remote.port);
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
						setSelectedCandidatePair(
							candidatePairs[item.selectedCandidatePairId as string],
						);
					}
					// Old implementations
					if (
						(item.type === "candidate-pair" && item.selected)
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
						return this.destroy(newError(err, "ERR_DATA_CHANNEL"));
					}
					this._chunk = undefined;
					this.debug("sent chunk from \"write before connect\"");
				}

				this.debug("connect");
				this.emit("connect");
			});
		};
		findCandidatePair();
	}

	private _onInterval() {
		if (!this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
			return;
		}
		this._onChannelBufferedAmountLow();
	}

	private _onSignalingStateChange() {
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

	private _onIceCandidate(event: RTCPeerConnectionIceEvent) {
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

	private _onChannelMessage(event: MessageEvent) {
		if (this.destroyed) {
			return;
		}

		let data = event.data;
		if (data instanceof ArrayBuffer) data = Buffer.from(data);
		this.writable.getWriter().write(data);
	}

	private _onChannelBufferedAmountLow() {
		if (this.destroyed || !this._channel) return;
		this.debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
	}

	private _onChannelOpen() {
		if (this._connected || this.destroyed) return;
		this.debug("on channel open");
		this._channelReady = true;
		this._maybeReady();
	}

	private _onChannelClose() {
		if (this.destroyed) return;
		this.debug("on channel close");
		this.destroy(undefined);
	}

	private _onTrack(event: RTCTrackEvent) {
		if (this.destroyed) return;

		event.streams.forEach(eventStream => {
			this.debug("on track");
			this.emit("track", { track: event.track, eventStream });

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
