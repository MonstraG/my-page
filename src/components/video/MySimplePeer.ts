/**
 * https://github.com/feross/simple-peer
 * simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource>
 */

import { Duplex } from "stream";

interface MySimplePeerOptions {
	/** set to `true` if this is the initiating peer */
	initiator?: boolean | undefined;
	/** custom webrtc data channel configuration (used by [`createDataChannel`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createDataChannel)) */
	channelConfig?: RTCDataChannelInit | undefined;
	/** custom webrtc data channel name */
	channelName?: string | undefined;
	/** custom webrtc configuration (used by [`RTCPeerConnection`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) constructor) */
	config?: RTCConfiguration | undefined;
	/** custom offer options (used by [`createOffer`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer) method) */
	offerOptions?: RTCOfferOptions | undefined;
	/** custom answer options (used by [`createAnswer`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer) method) */
	answerOptions?: RTCAnswerOptions | undefined;
	/** function to transform the generated SDP signaling data (for advanced users) */
	sdpTransform?: ((this: MySimplePeer, sdp: string) => string) | undefined;
	/** if video/voice is desired, pass stream returned from [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) */
	stream?: MediaStream | undefined;
	/** an array of MediaStreams returned from [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) */
	streams?: MediaStream[] | undefined;
	/** set to `false` to disable [trickle ICE](http://webrtchacks.com/trickle-ice/) and get a single 'signal' event (slower) */
	trickle?: boolean | undefined;
	/** similar to `trickle`, needs to be set to `false` to disable trickling, defaults to `false` */
	allowHalfTrickle?: boolean | undefined;
	/** if `trickle` is set to `false`, determines how long to wait before providing an offer or answer; default value is 5000 milliseconds  */
	iceCompleteTimeout?: number | undefined;
	/** set to true to create the stream in Object Mode. In this mode, incoming string data is not automatically converted to Buffer objects. */
	objectMode?: boolean | undefined;
	/**
	 * do debug logs or not
	 */
	debug?: boolean;
}

type TypedArray =
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array;

type SimplePeerData = string | Buffer | TypedArray | ArrayBuffer | Blob;

export type SignalData =
	| {
			type: "transceiverRequest";
			transceiverRequest: {
				kind: string;
				init?: RTCRtpTransceiverInit | undefined;
			};
	  }
	| {
			type: "renegotiate";
			renegotiate: true;
	  }
	| {
			type: "candidate";
			candidate: RTCIceCandidate;
	  }
	| RTCSessionDescriptionInit;

function randomBytes(size: number): Uint8Array {
	return crypto.getRandomValues(new Uint8Array(size));
}

/**
 * This is here just because
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toHex
 * is not yet widely available
 */
function buf2hex(buffer: Uint8Array) {
	return [...buffer].map((x) => x.toString(16).padStart(2, "0")).join("");
}

const MAX_BUFFERED_AMOUNT = 64 * 1024;
const ICECOMPLETE_TIMEOUT = 5 * 1000;
const CHANNEL_CLOSING_TIMEOUT = 5 * 1000;

/**
 * HACK: Filter trickle lines when trickle is disabled #354
 * https://github.com/feross/simple-peer/issues/354
 */
function filterTrickle(sdp: string) {
	return sdp.replace(/a=ice-options:trickle\s\n/g, "");
}

/**
 * Expose peer and data channel config for overriding all Peer
 * instances. Otherwise, just set opts.config or opts.channelConfig
 * when constructing a Peer.
 */
const defaultConfig = {
	iceServers: [
		{
			urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"],
		},
	],
	sdpSemantics: "unified-plan",
};

/**
 * WebRTC peer connection. Same API as node core `net.Socket`, plus a few extra methods.
 * Duplex stream.
 * @param {Object} opts
 */
export default class MySimplePeer extends Duplex {
	/**
	 * Expose peer and data channel config for overriding all Peer
	 * instances. Otherwise, just set opts.config or opts.channelConfig
	 * when constructing a Peer.
	 */
	config: RTCConfiguration;
	/**
	 * Expose peer and data channel config for overriding all Peer
	 * instances. Otherwise, just set opts.config or opts.channelConfig
	 * when constructing a Peer.
	 */
	channelConfig: RTCDataChannelInit;

	/** an array of MediaStreams returned from [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) */
	readonly streams?: MediaStream[] | undefined;

	private readonly _id: string;
	channelName: string | null;
	readonly initiator: boolean;
	readonly channelNegotiated: boolean | undefined;

	/** custom offer options (used by [`createOffer`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer) method) */
	offerOptions?: RTCOfferOptions | undefined;
	/** custom answer options (used by [`createAnswer`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createAnswer) method) */
	answerOptions?: RTCAnswerOptions | undefined;

	/** if video/voice is desired, pass stream returned from [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) */
	stream?: MediaStream | undefined;
	/** set to `false` to disable [trickle ICE](http://webrtchacks.com/trickle-ice/) and get a single 'signal' event (slower) */
	trickle?: boolean | undefined;
	/** similar to `trickle`, needs to be set to `false` to disable trickling, defaults to `false` */
	allowHalfTrickle?: boolean | undefined;
	/** if `trickle` is set to `false`, determines how long to wait before providing an offer or answer; default value is 5000 milliseconds  */
	iceCompleteTimeout?: number | undefined;
	/**
	 * do debug logs or not
	 */
	debug: boolean;

	destroying: boolean;
	private _connected: boolean;
	private _connecting: boolean;

	private remoteAddress: string | undefined;
	private remotePort: number | undefined;
	private localAddress: string | undefined;
	private localFamily: "IPv6" | "IPv4" | undefined;
	private localPort: number | undefined;

	private _pcReady: boolean;
	private _channelReady: boolean;
	private _iceComplete: boolean;
	private _iceCompleteTimer: ReturnType<typeof setTimeout> | null;
	private _channel: RTCDataChannel | null;
	private _pendingCandidates: RTCIceCandidate[];
	private _isNegotiating: boolean;
	private _firstNegotiation: boolean;
	private _batchedNegotiation: boolean;
	private _queuedNegotiation: boolean;
	private _sendersAwaitingStable: RTCRtpSender[];
	private _senderMap: Map<MediaStreamTrack, Map<MediaStream, RTCRtpSender>>;
	private _closingInterval: ReturnType<typeof setInterval> | null;
	private _remoteStreams: MediaStream[];
	private _chunk: SimplePeerData | null;
	private _cb: ((error?: Error | null) => void) | null;
	private _interval: ReturnType<typeof setInterval> | null;

	private _pc: RTCPeerConnection | undefined;

	private _onFinishBound: (() => void) | undefined;

	constructor(options: MySimplePeerOptions) {
		const resolvedOptions = {
			allowHalfOpen: false,
			...options,
		};

		super(resolvedOptions);

		this._id = buf2hex(randomBytes(4)).slice(0, 7);
		this._debug("new peer %o", resolvedOptions);

		this.channelName = resolvedOptions.initiator
			? resolvedOptions.channelName || buf2hex(randomBytes(20))
			: null;

		this.initiator = resolvedOptions.initiator || false;
		this.channelConfig = resolvedOptions.channelConfig || {};
		this.channelNegotiated = this.channelConfig.negotiated;
		this.config = { ...defaultConfig, ...resolvedOptions.config };
		this.offerOptions = resolvedOptions.offerOptions || {};
		this.answerOptions = resolvedOptions.answerOptions || {};
		this.streams =
			resolvedOptions.streams || (resolvedOptions.stream ? [resolvedOptions.stream] : []); // support old "stream" option
		this.trickle = resolvedOptions.trickle !== undefined ? resolvedOptions.trickle : true;
		this.allowHalfTrickle =
			resolvedOptions.allowHalfTrickle !== undefined
				? resolvedOptions.allowHalfTrickle
				: false;
		this.iceCompleteTimeout = resolvedOptions.iceCompleteTimeout || ICECOMPLETE_TIMEOUT;
		this.debug = Boolean(resolvedOptions.debug);

		this.destroyed = false;
		this.destroying = false;
		this._connected = false;
		this._connecting = false;

		this.remoteAddress = undefined;
		this.remotePort = undefined;
		this.localAddress = undefined;
		this.localFamily = undefined;
		this.localPort = undefined;

		this._pcReady = false;
		this._channelReady = false;
		this._iceComplete = false; // ice candidate trickle done (got null candidate)
		this._iceCompleteTimer = null; // send an offer/answer anyway after some timeout
		this._channel = null;
		this._pendingCandidates = [];
		this._isNegotiating = false; // is this peer waiting for negotiation to complete?
		this._firstNegotiation = true;
		this._batchedNegotiation = false; // batch synchronous negotiations
		this._queuedNegotiation = false; // is there a queued negotiation request?
		this._sendersAwaitingStable = [];
		this._senderMap = new Map<MediaStreamTrack, Map<MediaStream, RTCRtpSender>>();
		this._closingInterval = null;
		this._remoteStreams = [];
		this._chunk = null;
		this._cb = null;
		this._interval = null;

		try {
			this._pc = new RTCPeerConnection(this.config);
		} catch (err: unknown) {
			this.destroy(err);
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
		this._pc.onicecandidate = (event) => {
			this._onIceCandidate(event);
		};

		// HACK: Fix for odd Firefox behavior, see: https://github.com/feross/simple-peer/pull/783
		if (
			"peerIdentity" in this._pc &&
			typeof this._pc.peerIdentity === "object" &&
			this._pc.peerIdentity != null &&
			"catch" in this._pc.peerIdentity &&
			typeof this._pc.peerIdentity.catch === "function"
		) {
			this._pc.peerIdentity.catch((err: unknown) => {
				this.destroy(err);
			});
		}

		// Other spec events, unused by this implementation:
		// - onconnectionstatechange
		// - onicecandidateerror
		// - onfingerprintfailure
		// - onnegotiationneeded

		if (this.initiator || this.channelNegotiated) {
			if (this.channelName == null) {
				throw new Error("I cannot be an initiator and not have channel name!");
			}
			this._setupData({
				channel: this._pc.createDataChannel(this.channelName, this.channelConfig),
			});
		} else {
			this._pc.ondatachannel = (event) => {
				this._setupData(event);
			};
		}

		if (this.streams) {
			this.streams.forEach((stream) => {
				this.addStream(stream);
			});
		}
		this._pc.ontrack = (event) => {
			this._onTrack(event);
		};

		this._debug("initial negotiation");
		this._needsNegotiation();

		this._onFinishBound = () => {
			this._onFinish();
		};
		this.once("finish", this._onFinishBound);
	}

	address(): {
		port: number | undefined;
		family: "IPv6" | "IPv4" | undefined;
		address: string | undefined;
	} {
		return { port: this.localPort, family: this.localFamily, address: this.localAddress };
	}

	/**
	 * Call this method whenever the remote peer emits a `peer.on('signal')` event.
	 *
	 * The `data` will encapsulate a webrtc offer, answer, or ice candidate. These messages help
	 * the peers to eventually establish a direct connection to each other. The contents of these
	 * strings are an implementation detail that can be ignored by the user of this module;
	 * simply pass the data from 'signal' events to the remote peer and call `peer.signal(data)`
	 * to get connected.
	 */
	signal(input: string | SignalData): void {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot signal after peer is destroyed");
		if (this._pc == null) throw new Error("cannot signal, no pc");

		const onInvalidData = () => {
			this.destroy(new Error("signal() called with invalid signal data"));
		};

		const data = (() => {
			if (typeof input === "string") {
				try {
					return JSON.parse(input) as SignalData;
				} catch (_err: unknown) {
					return undefined;
				}
			}
			return input;
		})();
		if (data == null) {
			onInvalidData();
			return;
		}

		this._debug("signal()");

		if ("renegotiate" in data && data.renegotiate && this.initiator) {
			this._debug("got request to renegotiate");
			this._needsNegotiation();
		}
		if ("transceiverRequest" in data && data.transceiverRequest && this.initiator) {
			this._debug("got request for transceiver");
			this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init);
		}
		if ("candidate" in data && data.candidate) {
			if (this._pc?.remoteDescription?.type) {
				this._addIceCandidate(data.candidate);
			} else {
				this._pendingCandidates.push(data.candidate);
			}
		}
		if ("sdp" in data && data.sdp) {
			this._pc
				.setRemoteDescription(new RTCSessionDescription(data))
				.then(() => {
					if (this.destroying) return;
					if (this.destroyed) return;
					if (this._pc == null) return;

					this._pendingCandidates.forEach((candidate) => {
						this._addIceCandidate(candidate);
					});
					this._pendingCandidates = [];

					if (this._pc.remoteDescription?.type === "offer") this._createAnswer();
				})
				.catch((err) => {
					this.destroy(err);
				});
		}
		if (
			!("sdp" in data) &&
			!("candidate" in data) &&
			!("renegotiate" in data) &&
			!("transceiverRequest" in data)
		) {
			onInvalidData();
		}
	}

	_addIceCandidate(candidate: RTCIceCandidate) {
		if (this.destroying) return;
		if (this.destroyed) return;
		if (this._pc == null) return;

		const iceCandidateObj = new RTCIceCandidate(candidate);
		this._pc.addIceCandidate(iceCandidateObj).catch((err) => {
			if (!iceCandidateObj.address || iceCandidateObj.address.endsWith(".local")) {
				console.warn("Ignoring unsupported ICE candidate.");
			} else {
				this.destroy(err);
			}
		});
	}

	/**
	 * Send text/binary data to the remote peer. `data` can be any of several types: `String`,
	 * `ArrayBufferView` (`Uint8Array`, etc.), `ArrayBuffer`, or `Blob` (in browsers that support it).
	 *
	 * Note: If this method is called before the `peer.on('connect')` event has fired,
	 * then an exception will be thrown. Use `peer.write(data)`
	 * (which is inherited from the duplex stream interface)
	 * if you want this data to be buffered instead.
	 */
	send(chunk: SimplePeerData): void {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot send after peer is destroyed");
		if (this._channel == null) throw new Error("cannot send, no channel");

		// @ts-expect-error there is like 16x5 types comparisons here, and I don't know who is unhappy
		this._channel.send(chunk);
	}

	/** Add a `RTCRtpTransceiver` to the connection. Can be used to add transceivers before adding tracks. Automatically called as necessary by `addTrack`. */
	addTransceiver(kind: string, init?: RTCRtpTransceiverInit): void {
		if (this.destroying) return;
		if (this.destroyed) new Error("cannot addTransceiver after peer is destroyed");
		if (this._pc == null) throw new Error("cannot addTransceiver - no pc");

		this._debug("addTransceiver()");

		if (this.initiator) {
			try {
				this._pc.addTransceiver(kind, init);
				this._needsNegotiation();
			} catch (err) {
				this.destroy(err);
			}
		} else {
			this.emit("signal", {
				// request initiator to renegotiate
				type: "transceiverRequest",
				transceiverRequest: { kind, init },
			});
		}
	}

	/**
	 * Add a MediaStream to the connection.
	 * @param {MediaStream} stream
	 */
	addStream(stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot addStream after peer is destroyed");
		this._debug("addStream()");

		stream.getTracks().forEach((track) => {
			this.addTrack(track, stream);
		});
	}

	/** Add a `MediaStreamTrack` to the connection. Must also pass the `MediaStream` you want to attach it to. */
	addTrack(track: MediaStreamTrack, stream: MediaStream) {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot addTrack after peer is destroyed");
		if (this._pc == null) throw new Error("cannot addTrack - no pc");
		this._debug("addTrack()");

		const submap = this._senderMap.get(track) || new Map(); // nested Maps map [track, stream] to sender
		let sender = submap.get(stream);
		if (!sender) {
			sender = this._pc.addTrack(track, stream);
			submap.set(stream, sender);
			this._senderMap.set(track, submap);
			this._needsNegotiation();
		} else if (sender.removed) {
			throw new Error(
				"Track has been removed. You should enable/disable tracks that you want to re-add.",
			);
		} else {
			throw new Error("Track has already been added to that stream.");
		}
	}

	/** Replace a `MediaStreamTrack` with another track. Must also pass the `MediaStream` that the old track was attached to. */
	replaceTrack(
		oldTrack: MediaStreamTrack,
		newTrack: MediaStreamTrack,
		stream: MediaStream,
	): void {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot replaceTrack after peer is destroyed");
		this._debug("replaceTrack()");

		const submap = this._senderMap.get(oldTrack) ?? new Map<MediaStream, RTCRtpSender>();
		const sender = submap.get(stream);
		if (!sender) {
			throw new Error("Cannot replace track that was never added.");
		}
		if (newTrack) this._senderMap.set(newTrack, submap);

		if (sender.replaceTrack != null) {
			sender.replaceTrack(newTrack);
		} else {
			this.destroy(new Error("replaceTrack is not supported in this browser"));
		}
	}

	/** Remove a `MediaStreamTrack` from the connection. Must also pass the `MediaStream` that it was attached to. */
	removeTrack(track: MediaStreamTrack, stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot removeTrack after peer is destroyed");
		if (this._pc == null) throw new Error("cannot removeTrack - no pc");
		this._debug("removeSender()");

		const submap = this._senderMap.get(track);
		const sender = submap?.get(stream);
		if (!sender) {
			throw new Error("Cannot remove track that was never added.");
		}
		try {
			if ("removed" in sender) {
				sender.removed = true;
			}
			this._pc.removeTrack(sender);
		} catch (err: unknown) {
			if (err instanceof Error && err.name === "NS_ERROR_UNEXPECTED") {
				this._sendersAwaitingStable.push(sender); // HACK: Firefox must wait until (signalingState === stable) https://bugzilla.mozilla.org/show_bug.cgi?id=1133874
			} else {
				this.destroy(err);
			}
		}
		this._needsNegotiation();
	}

	/**
	 * Remove a MediaStream from the connection.
	 * @param {MediaStream} stream
	 */
	removeStream(stream: MediaStream): void {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot removeStream after peer is destroyed");
		this._debug("removeSenders()");

		stream.getTracks().forEach((track) => {
			this.removeTrack(track, stream);
		});
	}

	_needsNegotiation() {
		this._debug("_needsNegotiation");
		if (this._batchedNegotiation) return; // batch synchronous renegotiations
		this._batchedNegotiation = true;
		queueMicrotask(() => {
			this._batchedNegotiation = false;
			if (this.initiator || !this._firstNegotiation) {
				this._debug("starting batched negotiation");
				this.negotiate();
			} else {
				this._debug("non-initiator initial negotiation request discarded");
			}
			this._firstNegotiation = false;
		});
	}

	negotiate() {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot negotiate after peer is destroyed");

		if (this.initiator) {
			if (this._isNegotiating) {
				this._queuedNegotiation = true;
				this._debug("already negotiating, queueing");
			} else {
				this._debug("start negotiation");
				setTimeout(() => {
					// HACK: Chrome crashes if we immediately call createOffer
					this._createOffer();
				}, 0);
			}
		} else {
			if (this._isNegotiating) {
				this._queuedNegotiation = true;
				this._debug("already negotiating, queueing");
			} else {
				this._debug("requesting negotiation from initiator");
				this.emit("signal", {
					// request initiator to renegotiate
					type: "renegotiate",
					renegotiate: true,
				});
			}
		}
		this._isNegotiating = true;
	}

	override destroy(err?: Error | unknown): this {
		if (this.destroyed || this.destroying) return this;
		this.destroying = true;

		this._debug("destroying (error: %s)", err);

		queueMicrotask(() => {
			// allow events concurrent with the call to _destroy() to fire (see #692)
			this.destroyed = true;
			this.destroying = false;

			this._debug("destroy (error: %s)", err);

			this.readable = this.writable = false;

			this._connected = false;
			this._pcReady = false;
			this._channelReady = false;
			this._remoteStreams = [];
			this._senderMap.clear();

			if (this._closingInterval) {
				clearInterval(this._closingInterval);
			}
			this._closingInterval = null;

			if (this._interval) {
				clearInterval(this._interval);
			}
			this._interval = null;
			this._chunk = null;
			this._cb = null;

			if (this._onFinishBound) {
				this.removeListener("finish", this._onFinishBound);
			}

			if (this._channel) {
				try {
					this._channel.close();
				} catch (_err) {}

				// allow events concurrent with destruction to be handled
				this._channel.onmessage = null;
				this._channel.onopen = null;
				this._channel.onclose = null;
				this._channel.onerror = null;
			}
			if (this._pc) {
				try {
					this._pc.close();
				} catch (_err) {}

				// allow events concurrent with destruction to be handled
				this._pc.oniceconnectionstatechange = null;
				this._pc.onicegatheringstatechange = null;
				this._pc.onsignalingstatechange = null;
				this._pc.onicecandidate = null;
				this._pc.ontrack = null;
				this._pc.ondatachannel = null;
			}
			this._pc = undefined;
			this._channel = null;

			if (err) this.emit("error", err);
			this.emit("close");
		});
		return this;
	}

	_setupData(event: RTCDataChannelEvent | { channel: RTCDataChannel }) {
		if (!event.channel) {
			// In some situations `pc.createDataChannel()` returns `undefined` (in wrtc),
			// which is invalid behavior. Handle it gracefully.
			// See: https://github.com/feross/simple-peer/issues/163
			this.destroy(new Error("Data channel event is missing `channel` property"));
			return;
		}

		this._channel = event.channel;
		this._channel.binaryType = "arraybuffer";

		if (typeof this._channel.bufferedAmountLowThreshold === "number") {
			this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT;
		}

		this.channelName = this._channel.label;

		this._channel.onmessage = (event) => {
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
			this.destroy(event.error);
		};

		// HACK: Chrome will sometimes get stuck in readyState "closing", let's check for this condition
		// https://bugs.chromium.org/p/chromium/issues/detail?id=882743
		let isClosing = false;
		this._closingInterval = setInterval(() => {
			// No "onclosing" event
			if (this._channel && this._channel.readyState === "closing") {
				if (isClosing) this._onChannelClose(); // closing timed out: equivalent to onclose firing
				isClosing = true;
			} else {
				isClosing = false;
			}
		}, CHANNEL_CLOSING_TIMEOUT);
	}

	override _read() {}

	override _write(
		chunk: SimplePeerData,
		_encoding: BufferEncoding,
		cb: (error?: Error | null) => void,
	): void {
		if (this.destroyed) {
			cb(new Error("cannot write after peer is destroyed"));
			return;
		}

		if (this._channel == null) {
			cb(new Error("cannot write - no channel"));
			return;
		}

		if (this._connected) {
			try {
				this.send(chunk);
			} catch (err) {
				this.destroy(err);
				return;
			}
			if (this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
				this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount);
				this._cb = cb;
			} else {
				cb(null);
			}
		} else {
			this._debug("write before connect");
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
		this._debug("started iceComplete timeout");
		this._iceCompleteTimer = setTimeout(() => {
			if (!this._iceComplete) {
				this._iceComplete = true;
				this._debug("iceComplete timeout completed");
				this.emit("iceTimeout");
				this.emit("_iceComplete");
			}
		}, this.iceCompleteTimeout);
	}

	_createOffer() {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot _createOffer after peer is destroyed");
		if (this._pc == null) throw new Error("cannot _createOffer - no pc");

		this._pc
			.createOffer(this.offerOptions)
			.then((offer) => {
				if (this.destroying) return;
				if (this.destroyed) return;
				if (this._pc == null) return;

				if (
					!this.trickle &&
					!this.allowHalfTrickle &&
					"sdp" in offer &&
					typeof offer.sdp === "string"
				) {
					offer.sdp = filterTrickle(offer.sdp);
				}

				const sendOffer = () => {
					if (this.destroying) return;
					if (this.destroyed) return;
					if (this._pc == null) return;

					const signal = this._pc.localDescription || offer;
					this._debug("signal");
					this.emit("signal", {
						type: signal.type,
						sdp: signal.sdp,
					});
				};

				const onSuccess = () => {
					this._debug("createOffer success");
					if (this.destroyed) return;
					if (this.trickle || this._iceComplete) sendOffer();
					else this.once("_iceComplete", sendOffer); // wait for candidates
				};

				const onError = (err: unknown) => {
					this.destroy(err);
				};

				this._pc.setLocalDescription(offer).then(onSuccess).catch(onError);
			})
			.catch((err) => {
				this.destroy(err);
			});
	}

	_requestMissingTransceivers() {
		if (this.destroying) return;
		if (this.destroyed) return;
		if (this._pc == null) return;

		if (this._pc.getTransceivers) {
			this._pc.getTransceivers().forEach((transceiver) => {
				if (!transceiver.mid && transceiver.sender.track) {
					this.addTransceiver(transceiver.sender.track.kind);
				}
			});
		}
	}

	_createAnswer() {
		if (this.destroying) return;
		if (this.destroyed) return;
		if (this._pc == null) return;

		this._pc
			.createAnswer(this.answerOptions)
			.then((answer) => {
				if (this.destroying) return;
				if (this.destroyed) return;
				if (this._pc == null) return;

				if (
					!this.trickle &&
					!this.allowHalfTrickle &&
					"sdp" in answer &&
					typeof answer.sdp === "string"
				) {
					answer.sdp = filterTrickle(answer.sdp);
				}

				const sendAnswer = () => {
					if (this.destroying) return;
					if (this.destroyed) return;
					if (this._pc == null) return;

					const signal = this._pc.localDescription || answer;
					this._debug("signal");
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
					this.destroy(err);
				};

				this._pc.setLocalDescription(answer).then(onSuccess).catch(onError);
			})
			.catch((err) => {
				this.destroy(err);
			});
	}

	_onConnectionStateChange() {
		if (this.destroying) return;
		if (this.destroyed) return;
		if (this._pc == null) return;

		if (this._pc.connectionState === "failed") {
			this.destroy(new Error("Connection failed."));
		}
	}

	_onIceStateChange() {
		if (this.destroying) return;
		if (this.destroyed) return;
		if (this._pc == null) return;

		const iceConnectionState = this._pc.iceConnectionState;
		const iceGatheringState = this._pc.iceGatheringState;

		this._debug(
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
			this.destroy(new Error("Ice connection failed."));
		}
		if (iceConnectionState === "closed") {
			this.destroy(new Error("Ice connection closed."));
		}
	}

	getStats(cb: (report: RTCStatsReport | undefined) => void) {
		if (this.destroying) return;
		if (this.destroyed) throw new Error("cannot getStats after peer is destroyed");
		if (this._pc == null) throw new Error("cannot getStats, no pc");

		this._pc.getStats().then(
			(report) => {
				cb(report);
			},
			() => cb(undefined),
		);
	}

	_maybeReady() {
		this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady);
		if (this._connected || this._connecting || !this._pcReady || !this._channelReady) return;

		this._connecting = true;

		// HACK: We can't rely on order here, for details see https://github.com/js-platform/node-webrtc/issues/339
		const findCandidatePair = () => {
			if (this.destroyed) return;

			this.getStats((report) => {
				// Treat getStats error as non-fatal. It's not essential.
				if (this.destroyed) return;

				/**
				 * https://w3c.github.io/webrtc-stats/#icecandidate-dict*
				 * not in typescript types for some reason
				 */
				interface RTCIceCandidateStats extends RTCStats {
					transportId: string;
					address?: string;
					port: number;
					protocol?: string;
					candidateType: RTCIceCandidateType;
					priority: number;
					url: string;
					relayProtocol: unknown;
					foundation: string;
					relatedAddress: string;
					relatedPort: number;
					usernameFragment: string;
					tcpType: unknown;
				}

				const remoteCandidates: Record<string, RTCIceCandidateStats> = {};
				const localCandidates: Record<string, RTCIceCandidateStats> = {};
				const candidatePairs: Record<string, RTCIceCandidatePairStats> = {};
				let foundSelectedCandidatePair = false;

				// https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport#common_instance_properties
				const reportItems: RTCStats[] = [...(report?.entries() ?? [])].flat();

				for (const item of reportItems) {
					if (item.type === "remote-candidate") {
						remoteCandidates[item.id] = item as RTCIceCandidateStats;
					}
					if (item.type === "local-candidate") {
						localCandidates[item.id] = item as RTCIceCandidateStats;
					}
					if (item.type === "candidate-pair") {
						candidatePairs[item.id] = item as RTCIceCandidatePairStats;
					}
				}

				const setSelectedCandidatePair = (
					selectedCandidatePair: RTCIceCandidatePairStats,
				) => {
					foundSelectedCandidatePair = true;

					const local = localCandidates[selectedCandidatePair.localCandidateId];
					if (local?.address) {
						this.localAddress = local.address;
						this.localPort = Number(local.port);
					}

					if (this.localAddress) {
						this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4";
					}

					const remote = remoteCandidates[selectedCandidatePair.remoteCandidateId];
					if (remote?.address) {
						// Spec
						this.remoteAddress = remote.address;
						this.remotePort = Number(remote.port);
					}

					this._debug(
						"connect local: %s:%s remote: %s:%s",
						this.localAddress,
						this.localPort,
						this.remoteAddress,
						this.remotePort,
					);
				};

				reportItems.forEach((item) => {
					if (
						item.type === "transport" &&
						"selectedCandidatePairId" in item &&
						typeof item.selectedCandidatePairId === "string"
					) {
						setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId]);
					}
				});

				// Ignore candidate pair selection in browsers like Safari 11 that do not have any local or remote candidates
				// But wait until at least 1 candidate pair is available
				if (
					!foundSelectedCandidatePair &&
					(!Object.keys(candidatePairs).length || Object.keys(localCandidates).length)
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
						this.destroy(err);
						return;
					}
					this._chunk = null;
					this._debug('sent chunk from "write before connect"');

					const cb = this._cb;
					this._cb = null;
					cb?.(null);
				}

				// If `bufferedAmountLowThreshold` and 'onbufferedamountlow' are unsupported,
				// fallback to using setInterval to implement backpressure.
				if (typeof this._channel?.bufferedAmountLowThreshold !== "number") {
					this._interval = setInterval(() => this._onInterval(), 150);
					if (this._interval.unref) this._interval.unref();
				}

				this._debug("connect");
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
		if (this.destroying) return;
		if (this.destroyed) return;
		if (this._pc == null) return;

		if (this._pc.signalingState === "stable") {
			this._isNegotiating = false;

			// HACK: Firefox doesn't yet support removing tracks when signalingState !== 'stable'
			this._debug("flushing sender queue", this._sendersAwaitingStable);
			this._sendersAwaitingStable.forEach((sender) => {
				if (this.destroying) return;
				if (this.destroyed) return;
				if (this._pc == null) return;

				this._pc.removeTrack(sender);
				this._queuedNegotiation = true;
			});
			this._sendersAwaitingStable = [];

			if (this._queuedNegotiation) {
				this._debug("flushing negotiation queue");
				this._queuedNegotiation = false;
				this._needsNegotiation(); // negotiate again
			} else {
				this._debug("negotiated");
				this.emit("negotiated");
			}
		}

		this._debug("signalingStateChange %s", this._pc.signalingState);
		this.emit("signalingStateChange", this._pc.signalingState);
	}

	_onIceCandidate(event: RTCPeerConnectionIceEvent) {
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

	_onChannelMessage(event: MessageEvent) {
		if (this.destroyed) return;
		this.push(event.data);
	}

	_onChannelBufferedAmountLow() {
		if (this.destroyed || !this._cb) return;
		this._debug("ending backpressure: bufferedAmount", this._channel?.bufferedAmount);
		const cb = this._cb;
		this._cb = null;
		cb(null);
	}

	_onChannelOpen() {
		if (this._connected || this.destroyed) return;
		this._debug("on channel open");
		this._channelReady = true;
		this._maybeReady();
	}

	_onChannelClose() {
		if (this.destroyed) return;
		this._debug("on channel close");
		this.destroy();
	}

	_onTrack(event: RTCTrackEvent) {
		if (this.destroyed) return;

		event.streams.forEach((eventStream) => {
			this._debug("on track");
			this.emit("track", event.track, eventStream);

			if (
				this._remoteStreams.some((remoteStream) => {
					return remoteStream.id === eventStream.id;
				})
			) {
				return; // Only fire one 'stream' event, even though there may be multiple tracks per stream
			}

			this._remoteStreams.push(eventStream);
			queueMicrotask(() => {
				this._debug("on stream");
				this.emit("stream", eventStream); // ensure all tracks have been added
			});
		});
	}

	_debug(...args: unknown[]) {
		if (this.debug) {
			console.log(`SimplePeer [${this._id}]:`, ...args);
		}
	}
}
