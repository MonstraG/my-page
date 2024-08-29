import type { FC } from "react";
import styles from "@/app/(cvs)/ksesha-cuts/GradientCircles.module.css";

export const GradientCircles: FC = () => (
	<div className={styles.container}>
		<div className={styles.red} />
		<div className={styles.yellow} />
	</div>
);
