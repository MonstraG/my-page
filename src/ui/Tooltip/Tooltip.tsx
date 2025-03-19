import type { FCC } from "@/types/react";
import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Tooltip.module.css";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title: ReactNode;
	arrow?: boolean;
	disabled?: boolean;
	open?: boolean;
	placement?: "bottom" | "left";
}

export const Tooltip: FCC<TooltipProps> = ({
	title,
	arrow,
	children,
	disabled,
	className,
	open,
	placement = "bottom",
	...rest
}) => (
	<div
		className={clsx(
			styles.host,
			!Boolean(disabled) && styles.enabled,
			open == null && styles.uncontrolled,
			open === true && styles.open,
			placement === "left" && styles.placementLeft,
			className,
		)}
		{...rest}
	>
		{children}
		<div
			className={clsx(
				styles.title,
				arrow && styles.arrow,
				placement === "left" && styles.placementLeft,
			)}
		>
			{title}
		</div>
	</div>
);
