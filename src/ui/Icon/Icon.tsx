import type { SvgIconProps } from "@/icons/icon.type";
import type { FCC } from "@/types/react";
import { clsx } from "clsx";
import styles from "./Icon.module.css";

export const Icon: FCC<SvgIconProps> = ({ className, children, ...rest }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		height="24px"
		width="24px"
		className={clsx(styles.icon, className)}
		{...rest}
	>
		{children}
	</svg>
);
