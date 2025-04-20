import type { LocalTrack } from "@/components/video/LocalMediaContextProvider";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";
import { type FC, useCallback } from "react";

interface Props {
	localVideoTrack: LocalTrack;
	title: string;
}

export const LocalVideoElement: FC<Props> = ({ localVideoTrack, title }) => {
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
			title={title}
			disabled={!localVideoTrack.enabled}
		/>
	);
};
