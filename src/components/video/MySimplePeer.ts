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

type Signal = DescriptionSignal | CandidateSignal;

const signalingChannel = {
	send: (signal: Signal) => {},
};

const selfVideo = document.querySelector("video.self-view")! as HTMLVideoElement;
const remoteVideo = document.querySelector("video.remote-view")! as HTMLVideoElement;

const rtcPeerConnection = new RTCPeerConnection(rtcConfiguration);

rtcPeerConnection.addEventListener("track", ({ track, streams }) => {
	track.addEventListener("unmute", () => {
		if (remoteVideo.srcObject) {
			return;
		}
		remoteVideo.srcObject = streams[0];
	});
});

async function setAndSendLocalDescription() {
	await rtcPeerConnection.setLocalDescription();
	if (rtcPeerConnection.localDescription == null) {
		throw new Error("Failed to get rtcPeerConnection.localDescription after setting it");
	}
	signalingChannel.send({ description: rtcPeerConnection.localDescription });
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
	signalingChannel.send({ candidate });
});

async function start() {
	try {
		const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

		for (const mediaStreamTrack of mediaStream.getTracks()) {
			rtcPeerConnection.addTrack(mediaStreamTrack, mediaStream);
		}
		selfVideo.srcObject = mediaStream;
	} catch (error) {
		console.error("Error occurred when getting media:", error);
	}
}

let ignoreOffer = false;
let isSettingRemoteAnswerPending = false;

signalingChannel.onmessage = async (signal: Signal) => {
	if ("description" in signal) {
		try {
			const description = signal.description;

			const readyForOffer = !makingOffer
				&& (rtcPeerConnection.signalingState === "stable" || isSettingRemoteAnswerPending);
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
};
