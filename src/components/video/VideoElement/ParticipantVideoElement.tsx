import type { Participant } from "@/components/video/video.types";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC, useCallback } from "react";

interface ParticipantVideoProps {
	participant: Participant;
}

export const ParticipantVideoElement: FC<ParticipantVideoProps> = ({ participant }) => {
	const attachParticipantVideo = useCallback(
		(element: HTMLVideoElement | null) => {
			if (!element) {
				return;
			}

			const connectStream = (event: CustomEvent<MediaStream>) => {
				console.debug("Received stream from participant", participant.id);
				element.srcObject = event.detail;
			};

			participant.peer.addEventListener("stream", connectStream);

			return () => {
				participant.peer.removeEventListener("stream", connectStream);
			};
		},
		[participant],
	);

	return <VideoElement attachVideo={attachParticipantVideo} title={participant.id} />;
};
