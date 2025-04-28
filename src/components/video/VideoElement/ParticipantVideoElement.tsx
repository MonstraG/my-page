import type { Participant } from "@/components/video/video.types";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC, useCallback, useSyncExternalStore } from "react";

interface ParticipantVideoProps {
	participant: Participant;
}

export const ParticipantVideoElement: FC<ParticipantVideoProps> = ({ participant }) => {
	const subscribe = useCallback((callback: () => void) => {
		participant.peer.addEventListener("stream", callback);
		return () => {
			participant.peer.removeEventListener("stream", callback);
		};
	}, [participant.peer]);

	const getSnapshot = useCallback(() => {
		return participant.peer._remoteStreams;
	}, [participant.peer._remoteStreams]);

	const streams = useSyncExternalStore(subscribe, getSnapshot);

	return (
		<>
			{streams.map(stream => (
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
