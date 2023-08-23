import type { FC, HTMLAttributes } from "react";
import styles from "@/components/InfoIcon/InfoIcon.module.scss";

export const InfoIcon: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<div className={styles.icon} {...props}>
		i
	</div>
);
