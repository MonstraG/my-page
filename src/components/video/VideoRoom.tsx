import { useParticipantStore } from "@/components/video/useParticipantStore";
import type {
	AnnouncementMessage,
	IdAssignmentMessage,
	MyWebSocket,
	ParticipantLeavesMessage,
	SignalMessage,
	SocketMessage,
} from "@/components/video/useWebSocketConnection";
import type { Participant } from "@/components/video/video.types";
import { LocalVideoElement } from "@/components/video/VideoElement/LocalVideoElement";
import { ParticipantVideoElement } from "@/components/video/VideoElement/ParticipantVideoElement";
import { Button } from "@/ui/Button/Button";
import { type FC, useCallback, useEffect, useState } from "react";
import SimplePeer, { type SignalData } from "simple-peer";

interface Props {
	localMediaStream: MediaStream;
	webSocket: MyWebSocket;
	onLeave: () => void;
}

export const VideoRoom: FC<Props> = ({ localMediaStream, webSocket, onLeave }) => {
	const [myId, setMyId] = useState<string | undefined>(undefined);

	const { participants, addParticipant, clearParticipants, removeParticipant, getParticipant } =
		useParticipantStore();

	const createParticipant = useCallback(
		function createSimplePeer(initiator: boolean, peerId: string) {
			console.debug("Creating peer for", peerId);
			const peer = new SimplePeer({ initiator, stream: localMediaStream });
			const newParticipant: Participant = {
				id: peerId,
				peer,
			};
			newParticipant.peer.addListener(
				"signal",
				function handlePeerSignalData(signalData: SignalData) {
					console.debug("Sending signal to", newParticipant.id);
					if (!myId) {
						throw new Error("Trying to send signal, but I don't know who am I yet!");
					}

					const messageSignal: SignalMessage = {
						fromId: myId,
						toId: newParticipant.id,
						signal: signalData,
					};
					webSocket.send(messageSignal);
				},
			);
			newParticipant.peer.addListener("error", function handlePeerError(error: Error) {
				console.error(`Error occurred for peer ${newParticipant.id}`, error);
				if (!newParticipant.peer.destroyed) {
					newParticipant.peer.destroy();
				}

				removeParticipant(newParticipant.id);
			});

			addParticipant(newParticipant);

			return newParticipant;
		},
		[addParticipant, localMediaStream, myId, removeParticipant, webSocket],
	);

	const sendAnnouncementMessage = useCallback(
		function createAndSendAnnouncement(myId: string) {
			const message: AnnouncementMessage = {
				fromId: myId,
				announce: true,
			};
			console.debug("Sending announcement", message);
			webSocket.send(message);
		},
		[webSocket],
	);

	const handleIdAssignmentMessage = useCallback(
		function handleAssignmentId(message: IdAssignmentMessage) {
			console.debug("I now know my ID:", message.yourId);
			setMyId(message.yourId);
			sendAnnouncementMessage(message.yourId);
		},
		[sendAnnouncementMessage],
	);

	// when we receive announcement, we initiate peer link (and send signal) to them
	const handleAnnouncementMessage = useCallback(
		function onAnnouncementMessage(message: AnnouncementMessage) {
			createParticipant(true, message.fromId);
		},
		[createParticipant],
	);

	// when we get signal from somebody, they may be initiating peer link
	const handleSignalMessage = useCallback(
		function onSignalMessage(message: SignalMessage) {
			const participant = getParticipant(message.fromId)
				?? createParticipant(false, message.fromId);

			console.debug("Receiving signal from", message.fromId);
			participant.peer.signal(message.signal);
			return;
		},
		[getParticipant, createParticipant],
	);

	const handleParticipantLeavesMessage = useCallback(
		function callRemoveParticipant(message: ParticipantLeavesMessage) {
			removeParticipant(message.fromId);
		},
		[removeParticipant],
	);

	const handleWebSocketMessage = useCallback(
		function messageCallback(message: SocketMessage) {
			if ("yourId" in message) {
				console.debug("Got id assignment message", message);
				handleIdAssignmentMessage(message);
				return;
			}
			if ("announce" in message) {
				console.debug("Got announcement message", message);
				handleAnnouncementMessage(message);
				return;
			}
			if ("signal" in message) {
				console.debug("Got signal message", message);
				handleSignalMessage(message);
				return;
			}
			if ("bye" in message) {
				console.debug("Got participant leaves message", message);
				handleParticipantLeavesMessage(message);
				return;
			}
			console.error("Got unknown message", message);
		},
		[
			handleAnnouncementMessage,
			handleIdAssignmentMessage,
			handleSignalMessage,
			handleParticipantLeavesMessage,
		],
	);

	useEffect(() => {
		if (!webSocket) {
			return;
		}

		webSocket.setMessageCallback(handleWebSocketMessage);
	}, [webSocket, handleWebSocketMessage]);

	const handleLeave = useCallback(
		function cleanup() {
			clearParticipants();
			onLeave();
		},
		[clearParticipants, onLeave],
	);

	return (
		<div>
			<Button onClick={handleLeave}>Leave</Button>
			<LocalVideoElement mediaStream={localMediaStream} />

			{participants.map((participant) => {
				return <ParticipantVideoElement participant={participant} key={participant.id} />;
			})}
		</div>
	);
};
