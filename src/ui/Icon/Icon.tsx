import type { SvgIconPropsInternal } from "@/icons/icon.type";
import type { FCC } from "@/types/react";
import { cn } from "@/functions/cn";
import styles from "./Icon.module.css";

export const Icon: FCC<SvgIconPropsInternal> = ({ className, children, title, ...rest }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		height="24px"
		width="24px"
		className={cn(styles.icon, className)}
		{...rest}
	>
		<title>{title}</title>
		{children}
	</svg>
);
