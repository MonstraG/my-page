import { clsx } from "clsx";
import { type FC, type RefCallback } from "react";
import styles from "./VideoElement.module.css";

interface ParticipantVideoProps {
	muted?: boolean;
	attachVideo: RefCallback<HTMLVideoElement>;
	title: string;
	disabled?: boolean;
}

export const VideoElement: FC<ParticipantVideoProps> = (
	{ muted, attachVideo, title, disabled },
) => (
	<div className={clsx(styles.wrapper, disabled && styles.disabled)} title={title}>
		<div className={styles.background} />
		<video
			ref={attachVideo}
			autoPlay
			muted={muted}
			className={styles.video}
		/>
	</div>
);
