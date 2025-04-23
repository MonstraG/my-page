import type { Participant } from "@/components/video/video.types";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC } from "react";

interface ParticipantVideoProps {
	participant: Participant;
}

export const ParticipantVideoElement: FC<ParticipantVideoProps> = ({ participant }) => {
	return (
		<>
			{participant.theirStreams.map(stream => (
				<VideoElement
					key={stream.id}
					attachVideo={(element: HTMLVideoElement | null) => {
						if (!element) {
							return;
						}
						element.srcObject = stream;
					}}
					title={participant.id}
				/>
			))}
		</>
	);
};
