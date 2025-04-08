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

			const connectStream = (stream: MediaStream) => {
				console.debug(`Received stream from participant`, participant.id);
				element.srcObject = stream;
			};

			participant.peer.on("stream", connectStream);

			return () => {
				participant.peer.off("stream", connectStream);
			};
		},
		[participant],
	);

	return (
		<VideoElement
			attachVideo={attachParticipantVideo}
			title={participant.id}
		/>
	);
};
