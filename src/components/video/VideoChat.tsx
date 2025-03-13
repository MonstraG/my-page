"use client";
import { type FC, useCallback, useState } from "react";
import Peer, { type SignalData } from "simple-peer";
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
	peer: Peer.Instance;
}

interface Props {
	roomId: string;
}

export const VideoChat: FC<Props> = () => {
	const localMediaStream = useLocalMediaStream();

	const [participants, setParticipants] = useState<Participant[]>([]);

	const [webSocket, setWebsocket] = useState<MyWebSocket | null>(null);

	function cleanup() {
		if (webSocket) {
			webSocket.cleanup();
		}
		setParticipants((prev) => {
			for (const participant of prev) {
				participant.peer.destroy();
			}
			return [];
		});
	}

	const showOwnVideoStream = useCallback(
		(element: HTMLVideoElement | null) => {
			if (element) {
				element.srcObject = localMediaStream;
			}
		},
		[localMediaStream]
	);

	if (!localMediaStream) {
		return "Loading....";
	}

	if (!webSocket) {
		const handleJoin = () => {
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

			const talkToPeer = (
				initiator: boolean,
				userId: string,
				signal: SignalData | undefined
			) => {
				setParticipants((prev) => {
					const existingParticipant = prev.find(
						(participant) => participant.id === userId
					);
					if (existingParticipant) {
						if (signal) {
							existingParticipant.peer.signal(signal);
						} else {
							console.error("Received userId I already know but no signal!");
						}

						return prev;
					}

					const peer = new Peer({ initiator, stream: localMediaStream });
					console.debug("Creating peer for", userId);

					peer.on("signal", (signalData) => {
						if (!myId) {
							throw new Error(
								"Trying to send signal, but I don't know who am I yet!"
							);
						}

						const messageSignal: MessageSignal = {
							fromId: myId,
							toId: userId,
							signal: signalData
						};
						webSocket.send(messageSignal);
					});

					if (signal) {
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
		};

		return (
			<div>
				<Button onClick={handleJoin}>Join</Button>;
				<video
					ref={showOwnVideoStream}
					autoPlay
					muted
					style={{ width: "400px", aspectRatio: "16/9", background: "white" }}
				/>
			</div>
		);
	}

	return (
		<div>
			<Button onClick={cleanup}>Leave</Button>

			<video
				ref={showOwnVideoStream}
				autoPlay
				muted
				style={{ width: "400px", aspectRatio: "16/9", background: "white" }}
			/>

			{participants.map((participant) => {
				return <ParticipantVideo participant={participant} key={participant.id} />;
			})}
		</div>
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
