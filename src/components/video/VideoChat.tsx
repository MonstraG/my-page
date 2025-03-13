"use client";
import { type FC, useCallback, useState } from "react";
import SimplePeer, { type SignalData } from "simple-peer";
import { useLocalMediaStream } from "@/components/video/useLocalMediaStream";
import {
	getWebSocketConnection,
	type MessageAnnouncement,
	type MessageAssignId,
	type MessageSignal,
	type MessageUserLeaves,
	type MyWebSocket,
	type SocketMessage
} from "@/components/video/useWebSocketConnection";
import { Button } from "@/ui/Button/Button";

// https://github.com/feross/simple-peer

const participantsMap = new Map<string, Participant>();

interface Participant {
	id: string;
	peer: SimplePeer.Instance;
}

interface Props {
	roomId: string;
}

export const VideoChat: FC<Props> = ({ roomId }) => {
	const localMediaStream = useLocalMediaStream();

	const [webSocket, setWebsocket] = useState<MyWebSocket | null>(null);

	/**
	 * This serves as an indicator that peers changed, and we need to re-render the component
	 * In previous version of this code, `participantsMap` was this state, but that mean that the `setState` was idempotent,
	 * breaking it :(
	 */
	const [_, setPeersChanged] = useState<number>(0);
	const signalPeersChanged = useCallback(() => setPeersChanged(new Date().valueOf()), []);

	const handleJoin = useCallback(
		function join(myMediaStream: MediaStream, roomId: string) {
			let myId: undefined | string = undefined;

			const messageCallback = (message: SocketMessage) => {
				if ("yourId" in message) {
					handleAssignmentId(message);
					return;
				}
				if ("announce" in message) {
					handleNewAnnouncement(message);
					return;
				}
				if ("signal" in message) {
					handleSignal(message);
					return;
				}
				if ("bye" in message) {
					handleUserLeaves(message);
					return;
				}
				console.error(`Received unknown message`, message);
			};

			const webSocket = getWebSocketConnection(messageCallback, roomId);

			function talkToPeer(
				initiator: boolean,
				userId: string,
				signal: SignalData | undefined
			) {
				console.debug(
					`talkToPeer: initiator=${initiator}, userId=${userId}, hasSignal=${!!signal}`
				);

				const existingParticipant = participantsMap.get(userId);
				if (existingParticipant) {
					if (signal) {
						console.debug("Receiving signal from", userId);
						existingParticipant.peer.signal(signal);
					} else {
						console.error("Received userId I already know but no signal!");
					}
					return;
				}

				console.debug("Creating peer for", userId);
				const peer = new SimplePeer({ initiator, stream: myMediaStream });
				peer.on("signal", (signalData) => {
					console.debug("Sending signal to", userId);
					if (!myId) {
						throw new Error("Trying to send signal, but I don't know who am I yet!");
					}

					const messageSignal: MessageSignal = {
						fromId: myId,
						toId: userId,
						signal: signalData
					};
					webSocket.send(messageSignal);
				});

				peer.on("error", (error) => {
					console.error(`Error occurred for peer ${userId}`, error);
					if (!peer.destroyed) {
						peer.destroy();
					}
					participantsMap.delete(userId);
					signalPeersChanged();
				});

				if (signal) {
					console.debug("Applying received signal to new peer for", userId);
					peer.signal(signal);
				}

				const newParticipant: Participant = {
					id: userId,
					peer
				};

				participantsMap.set(userId, newParticipant);
				signalPeersChanged();
			}

			// should be first message, server tells us our id
			function handleAssignmentId(message: MessageAssignId) {
				myId = message.yourId;
				console.debug("I now know my id:", myId);

				const announcement: MessageAnnouncement = {
					fromId: myId,
					announce: true
				};
				webSocket.send(announcement);
			}

			// when we receive announcement, we initiate peer link (and send signal) to them
			function handleNewAnnouncement(message: MessageAnnouncement) {
				talkToPeer(true, message.fromId, undefined);
			}

			// when we get signal from somebody, they are initiating peer link
			function handleSignal(message: MessageSignal) {
				talkToPeer(false, message.fromId, message.signal);
			}

			function handleUserLeaves(message: MessageUserLeaves) {
				const participant = participantsMap.get(message.fromId);
				if (!participant) {
					console.error(
						`Trying to say bye to ${message.fromId}, but I don't know who it is`
					);
					return;
				}

				if (!participant.peer.destroyed) {
					participant.peer.destroy();
				}
				participantsMap.delete(participant.id);
				signalPeersChanged();
			}

			setWebsocket(webSocket);
		},
		[signalPeersChanged]
	);

	const handleLeave = useCallback(
		function cleanup() {
			setWebsocket((prev) => {
				prev?.cleanup();
				return null;
			});
			participantsMap.forEach((participant) => {
				if (!participant.peer.destroyed) {
					participant.peer.destroy();
				}
			});
			participantsMap.clear();
			signalPeersChanged();
		},
		[signalPeersChanged]
	);

	if (!localMediaStream) {
		return "Loading....";
	}

	if (!webSocket) {
		return (
			<div>
				<Button onClick={() => handleJoin(localMediaStream, roomId)}>Join</Button>
				<MyVideo mediaStream={localMediaStream} />
			</div>
		);
	}

	// cannot pass iterators directly
	const participantsToRender = Array.from(participantsMap.values());

	return (
		<div>
			<Button onClick={handleLeave}>Leave</Button>
			<MyVideo mediaStream={localMediaStream} />

			{participantsToRender.map((participant) => {
				return <ParticipantVideo participant={participant} key={participant.id} />;
			})}
		</div>
	);
};

interface MyVideoProps {
	mediaStream: MediaStream;
}

const MyVideo: FC<MyVideoProps> = ({ mediaStream }) => {
	const showOwnVideoStream = useCallback(
		(element: HTMLVideoElement | null) => {
			if (element) {
				element.srcObject = mediaStream;
			}
		},
		[mediaStream]
	);

	return (
		<video
			ref={showOwnVideoStream}
			autoPlay
			muted
			style={{ width: "400px", aspectRatio: "16/9", background: "white" }}
		/>
	);
};

interface ParticipantVideoProps {
	participant: Participant;
}

const ParticipantVideo: FC<ParticipantVideoProps> = ({ participant }) => {
	const attachVideo = useCallback(
		(element: HTMLVideoElement | null) => {
			if (!element) {
				return;
			}

			const connectStream = (stream: MediaStream) => {
				console.debug(`Received stream from participant`, participant.id);
				element.srcObject = stream;
			};

			participant.peer.on("stream", connectStream);

			return () => {
				participant.peer.off("stream", connectStream);
			};
		},
		[participant]
	);

	return (
		<video
			ref={attachVideo}
			autoPlay
			style={{ width: "400px", aspectRatio: "16/9", background: "white" }}
		/>
	);
};
