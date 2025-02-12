import type { FCC } from "@/types/react";
import styles from "./Tooltip.module.css";
import type { ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
	title: ReactNode;
	arrow?: boolean;
}

export const Tooltip: FCC<Props> = ({ title, arrow, children }) => (
	<div className={styles.host}>
		{children}
		<div className={clsx(styles.title, arrow && styles.arrow)}>{title}</div>
	</div>
);
