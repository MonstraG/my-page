import type { Participant } from "@/components/video/video.types";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC, useCallback, useSyncExternalStore } from "react";

type ExternalStoreSubscribe = (onStoreChange: () => void) => () => void;

interface ParticipantVideoProps {
	participant: Participant;
}

export const ParticipantVideoElement: FC<ParticipantVideoProps> = ({ participant }) => {
	const subscribe: ExternalStoreSubscribe = useCallback((callback) => {
		participant.peer.addListener("stream", callback);
		return () => {
			participant.peer.removeListener("stream", callback);
		};
	}, [participant.peer]);

	const getSnapshot = useCallback(() => {
		return participant.peer.streams;
	}, [participant.peer.streams]);

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
