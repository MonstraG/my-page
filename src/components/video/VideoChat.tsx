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

interface Participant {
	id: string;
	peer: SimplePeer.Instance;
}

interface Props {
	roomId: string;
}

export const VideoChat: FC<Props> = () => {
	const localMediaStream = useLocalMediaStream();

	const [participants, setParticipants] = useState<Participant[]>([]);

	const [webSocket, setWebsocket] = useState<MyWebSocket | null>(null);

	const handleLeave = useCallback(function cleanup() {
		setWebsocket((prev) => {
			prev?.cleanup();
			return null;
		});
		setParticipants((prev) => {
			for (const participant of prev) {
				participant.peer.destroy();
			}
			return [];
		});
	}, []);

	const handleJoin = useCallback(function join(myMediaStream: MediaStream) {
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

		const webSocket = getWebSocketConnection(messageCallback);

		const talkToPeer = (initiator: boolean, userId: string, signal: SignalData | undefined) => {
			setParticipants((prev) => {
				console.debug(
					`talkToPeer: initiator=${initiator}, userId=${userId}, hasSignal=${!!signal}`
				);

				const existingParticipant = prev.find((participant) => participant.id === userId);
				if (existingParticipant) {
					if (signal) {
						console.debug("Receiving signal from", userId);
						existingParticipant.peer.signal(signal);
					} else {
						console.error("Received userId I already know but no signal!");
					}

					return prev;
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
					setParticipants((prev) => {
						return prev.filter((p) => p.id !== userId);
					});
				});

				if (signal) {
					console.debug("Applying received signal to new peer for", userId);
					peer.signal(signal);
				}

				const newParticipant: Participant = {
					id: userId,
					peer
				};

				return [...prev, newParticipant];
			});
		};

		// should be first message, server tells us our id
		const handleAssignmentId = (message: MessageAssignId) => {
			myId = message.yourId;
			console.debug("I now know my id:", myId);

			const announcement: MessageAnnouncement = {
				fromId: myId,
				announce: true
			};
			webSocket.send(announcement);
		};

		// when we receive announcement, we initiate peer link (and send signal) to them
		const handleNewAnnouncement = (message: MessageAnnouncement) => {
			talkToPeer(true, message.fromId, undefined);
		};

		// when we get signal from somebody, they are initiating peer link
		const handleSignal = (message: MessageSignal) => {
			talkToPeer(false, message.fromId, message.signal);
		};

		const handleUserLeaves = (message: MessageUserLeaves) => {
			setParticipants((prev) => {
				const leavingIndex = prev.findIndex(
					(participant) => participant.id === message.fromId
				);
				if (leavingIndex < 0) {
					console.error(
						`Trying to say bye to ${message.fromId}, but I don't know who it is`
					);
					return prev;
				}

				const participant = prev[leavingIndex];
				participant.peer.destroy();

				return prev.toSpliced(leavingIndex, 1);
			});
		};

		setWebsocket(webSocket);
	}, []);

	if (!localMediaStream) {
		return "Loading....";
	}

	if (!webSocket) {
		return (
			<div>
				<Button onClick={() => handleJoin(localMediaStream)}>Join</Button>
				<MyVideo mediaStream={localMediaStream} />
			</div>
		);
	}

	return (
		<div>
			<Button onClick={handleLeave}>Leave</Button>
			<MyVideo mediaStream={localMediaStream} />

			{participants.map((participant) => {
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
