import { type FC, type RefCallback } from "react";

interface ParticipantVideoProps {
	muted?: boolean;
	attachVideo: RefCallback<HTMLVideoElement>;
}

export const VideoElement: FC<ParticipantVideoProps> = ({ muted, attachVideo }) => (
	<video
		ref={attachVideo}
		autoPlay
		muted={muted}
		style={{ width: "400px", aspectRatio: "16/9", background: "white" }}
	/>
);
