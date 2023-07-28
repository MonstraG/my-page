import type { FC } from "react";
import styles from "@/app/ksesha-cuts/GradientCircles.module.scss";

export const GradientCircles: FC = () => (
	<div className={styles.container}>
		<div className={styles.red} />
		<div className={styles.yellow} />
	</div>
);
