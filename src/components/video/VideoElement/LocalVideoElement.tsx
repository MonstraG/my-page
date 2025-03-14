import { type FC, useCallback } from "react";
import { VideoElement } from "@/components/video/VideoElement/VideoElement";

interface Props {
	mediaStream: MediaStream;
}

export const LocalVideoElement: FC<Props> = ({ mediaStream }) => {
	const attachLocalVideo = useCallback(
		(element: HTMLVideoElement | null) => {
			if (element) {
				element.srcObject = mediaStream;
			}
		},
		[mediaStream]
	);

	return <VideoElement attachVideo={attachLocalVideo} muted />;
};
