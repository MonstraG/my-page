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

interface DescriptionSignal {
	description: RTCSessionDescription;
}

interface CandidateSignal {
	candidate: RTCIceCandidate;
}

export type Signal = DescriptionSignal | CandidateSignal;

export interface PeerObject {
	handleReceivedSignal: (signal: Signal) => Promise<void>;
	subscribeToStreams: () => void;
	rtcPeerConnection: RTCPeerConnection;
	sendThisStream: (mediaStream: MediaStream) => Promise<void>;
}

export function createRtcPeerConnection(
	polite: boolean,
	onSendSignal: (signal: Signal) => void,
): PeerObject {
	const rtcPeerConnection = new RTCPeerConnection(rtcConfiguration);

	async function setAndSendLocalDescription() {
		await rtcPeerConnection.setLocalDescription();
		if (rtcPeerConnection.localDescription == null) {
			throw new Error("Failed to get rtcPeerConnection.localDescription after setting it");
		}
		onSendSignal({ description: rtcPeerConnection.localDescription });
	}

	let makingOffer = false;

	rtcPeerConnection.addEventListener("negotiationneeded", async () => {
		try {
			makingOffer = true;
			await setAndSendLocalDescription();
		} catch (error) {
			console.error("Error occurred when setting local description or sending it", error);
		} finally {
			makingOffer = false;
		}
	});

	rtcPeerConnection.addEventListener("icecandidate", ({ candidate }) => {
		if (candidate == null) {
			throw new Error("rtcPeerConnection received icecandidate event with null candidate");
		}
		onSendSignal({ candidate });
	});

	let tracks: MediaStreamTrack[] = [];

	rtcPeerConnection.addEventListener("track", (event) => {
		tracks.push(event.track);

		event.track.addEventListener("ended", () => {
			tracks = tracks.filter(t => t.id !== event.track.id);
			// Respond to track stopping (e.g., camera turned off)
		});
	});

	let ignoreOffer = false;
	let isSettingRemoteAnswerPending = false;

	return {
		rtcPeerConnection,
		async sendThisStream(mediaStream: MediaStream) {
			try {
				for (const mediaStreamTrack of mediaStream.getTracks()) {
					rtcPeerConnection.addTrack(mediaStreamTrack, mediaStream);
				}
			} catch (error) {
				console.error("Error occurred when getting media:", error);
			}
		},
		async handleReceivedSignal(signal: Signal) {
			if ("description" in signal) {
				try {
					const description = signal.description;

					const readyForOffer = !makingOffer
						&& (rtcPeerConnection.signalingState === "stable"
							|| isSettingRemoteAnswerPending);
					const offerCollision = description.type === "offer" && !readyForOffer;

					ignoreOffer = !polite && offerCollision;
					if (ignoreOffer) {
						return;
					}

					isSettingRemoteAnswerPending = description.type === "answer";
					await rtcPeerConnection.setRemoteDescription(description);
					isSettingRemoteAnswerPending = false;
					if (description.type === "offer") {
						await setAndSendLocalDescription();
					}
				} catch (error) {
					console.error(
						"Error occurred when trying to process received description signal",
						error,
					);
				}
			} else if ("candidate" in signal) {
				try {
					const candidate = signal.candidate;
					await rtcPeerConnection.addIceCandidate(candidate);
				} catch (error) {
					if (ignoreOffer) {
						console.debug("Error after adding ice candidate ignored, we ignore offers");
						return;
					}

					console.error(
						"Error occurred when trying to process received candidate signal",
						error,
					);
				}
			}
		},
		subscribeToStreams(subscriber: (event: RTCTrackEvent) => void) {
		},
	};
}
