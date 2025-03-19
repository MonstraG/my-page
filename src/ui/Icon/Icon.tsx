import type { FCC } from "@/types/react";
import { clsx } from "clsx";
import type { SVGProps } from "react";
import styles from "./Icon.module.css";

export const Icon: FCC<SVGProps<SVGSVGElement>> = ({ className, children, ...rest }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		className={clsx(styles.icon, className)}
		{...rest}
	>
		{children}
	</svg>
);
