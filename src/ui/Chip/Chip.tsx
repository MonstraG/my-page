import type { FCC } from "@/types/react";
import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./Chip.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md";
}

export const Chip: FCC<Props> = ({ size = "md", children, ...rest }) => (
	<div className={clsx(styles.chip, size === "sm" && styles.small)} {...rest}>
		{children}
	</div>
);
