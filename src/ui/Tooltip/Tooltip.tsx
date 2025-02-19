import type { FCC } from "@/types/react";
import styles from "./Tooltip.module.css";
import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title: ReactNode;
	arrow?: boolean;
	disabled?: boolean;
}

export const Tooltip: FCC<Props> = ({ title, arrow, children, disabled, className, ...rest }) => (
	<div className={clsx(styles.host, !Boolean(disabled) && styles.enabled, className)} {...rest}>
		{children}
		<div className={clsx(styles.title, arrow && styles.arrow)}>{title}</div>
	</div>
);
