import type { FCC } from "@/types/react";
import styles from "./Tooltip.module.css";
import type { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title: ReactNode;
	arrow?: boolean;
	disabled?: boolean;
	open?: boolean;
}

export const Tooltip: FCC<Props> = ({
	title,
	arrow,
	children,
	disabled,
	className,
	open,
	...rest
}) => {
	return (
		<div
			className={clsx(
				styles.host,
				!Boolean(disabled) && styles.enabled,
				open == null && styles.uncontrolled,
				open === true && styles.open,
				className
			)}
			{...rest}
		>
			{children}
			<div className={clsx(styles.title, arrow && styles.arrow)}>{title}</div>
		</div>
	);
};
