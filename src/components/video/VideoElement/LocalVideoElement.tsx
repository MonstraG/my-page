import { useLocalMediaContext } from "@/components/video/LocalMediaContextProvider";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC, useCallback } from "react";

export const LocalVideoElement: FC = () => {
	const { localVideoTrack } = useLocalMediaContext();

	const attachLocalVideo = useCallback(
		(element: HTMLVideoElement | null) => {
			if (element && localVideoTrack.track) {
				element.srcObject = new MediaStream([localVideoTrack.track]);
			}
		},
		[localVideoTrack],
	);

	return (
		<VideoElement
			attachVideo={attachLocalVideo}
			muted
			title="Local participant"
			disabled={!localVideoTrack.enabled}
		/>
	);
};
