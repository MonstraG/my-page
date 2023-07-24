import { FC } from "react";
import styles from "@/app/ksesha-cuts/GradientCircles.module.css";

export const GradientCircles: FC = () => (
	<div className={styles.container}>
		<div className={`${styles.circle} ${styles.red}`} />
		<div className={`${styles.circle} ${styles.yellow}`} />
	</div>
);
