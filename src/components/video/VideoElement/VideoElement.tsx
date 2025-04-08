import { type FC, type RefCallback } from "react";
import styles from "./VideoElement.module.css";

interface ParticipantVideoProps {
	muted?: boolean;
	attachVideo: RefCallback<HTMLVideoElement>;
	title: string;
}

export const VideoElement: FC<ParticipantVideoProps> = ({ muted, attachVideo, title }) => (
	<div className={styles.wrapper} title={title}>
		<video
			ref={attachVideo}
			autoPlay
			muted={muted}
			className={styles.video}
		/>
	</div>
);
