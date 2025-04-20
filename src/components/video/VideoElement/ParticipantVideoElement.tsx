import type { Participant } from "@/components/video/video.types";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC, useCallback, useEffect, useState, useSyncExternalStore } from "react";

type ExternalStoreSubscribe = (onStoreChange: () => void) => () => void;

interface ParticipantVideoProps {
	participant: Participant;
}

export const ParticipantVideoElement: FC<ParticipantVideoProps> = ({ participant }) => {
	// const [_, setDate] = useState<number>(0);
	// useEffect(() => {
	// 	const interval = setInterval(() => setDate(new Date().valueOf()), 1000);
	// 	return () => {
	// 		clearInterval(interval);
	// 	};
	// }, []);

	const subscribe: ExternalStoreSubscribe = useCallback((callback) => {
		participant.peer.addListener("stream", callback);
		participant.peer.addListener("pause", callback);
		participant.peer.addListener("resume", callback);
		return () => {
			participant.peer.removeListener("stream", callback);
			participant.peer.removeListener("pause", callback);
			participant.peer.removeListener("resume", callback);
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
