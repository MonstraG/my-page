import type { Participant } from "@/components/video/video.types";
import { useState } from "react";

const participantMap = new Map<string, Participant>();

/**
 * So here is the problem here.
 * I need a stable, mutable reference to `participants` to make sure that when I receive signal
 * from a peer every 3 ms (on LAN), the newly created participant is already available.
 * So instead of a naive Participant[], I have a stable singleton map, and a signalling state to
 * tell when the participant "list" changes
 */
export function useParticipantStore(): {
	participants: readonly Participant[];
	addParticipant: (newParticipant: Participant) => void;
	removeParticipant: (participantId: string) => void;
	clearParticipants: () => void;
	getParticipant: (participantId: string) => Participant | undefined;
} {
	const [participants, setParticipants] = useState<Participant[]>([]);

	function updateParticipantsList() {
		setParticipants(Array.from(participantMap.values()));
	}

	function addParticipant(participant: Participant) {
		participantMap.set(participant.id, participant);
		updateParticipantsList();
	}

	function removeParticipant(participantId: string) {
		const participant = participantMap.get(participantId);
		if (participant == null) {
			return;
		}

		if (!participant.peer.destroyed) {
			participant.peer.destroy();
		}
		participantMap.delete(participantId);
		updateParticipantsList();
	}

	function clearParticipants() {
		for (const participant of participantMap.values()) {
			if (!participant.peer.destroyed) {
				participant.peer.destroy();
			}
		}
		participantMap.clear();
		updateParticipantsList();
	}

	function getParticipant(participantId: string) {
		return participantMap.get(participantId);
	}

	return {
		participants,
		addParticipant,
		removeParticipant,
		clearParticipants,
		getParticipant,
	};
}
