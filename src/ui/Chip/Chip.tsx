import clsx from "clsx";
import styles from "./Chip.module.css";
import type { FCC } from "@/types/react";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md";
}

export const Chip: FCC<Props> = ({ size = "md", children, ...rest }) => (
	<div className={clsx(styles.chip, size === "sm" && styles.small)} {...rest}>
		{children}
	</div>
);
