import type { FCC } from "@/types/react";
import { cn } from "@/functions/cn";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Tooltip.module.css";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title: ReactNode;
	arrow?: boolean;
	disabled?: boolean;
	open?: boolean;
	placement?: "bottom" | "left" | undefined;
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
		className={cn(
			styles.host,
			!disabled && styles.enabled,
			open == null && styles.uncontrolled,
			open === true && styles.open,
			placement === "left" && styles.placementLeft,
			className,
		)}
		{...rest}
	>
		{children}
		<div
			className={cn(
				styles.title,
				arrow && styles.arrow,
				placement === "left" && styles.placementLeft,
			)}
		>
			{title}
		</div>
	</div>
);
