import { type FC, type RefCallback } from "react";
import styles from "./VideoElement.module.css";

interface ParticipantVideoProps {
	muted?: boolean;
	attachVideo: RefCallback<HTMLVideoElement>;
}

export const VideoElement: FC<ParticipantVideoProps> = ({ muted, attachVideo }) => (
	<div className={styles.wrapper}>
		<video
			ref={attachVideo}
			autoPlay
			muted={muted}
			className={styles.video}
		/>
	</div>
);
