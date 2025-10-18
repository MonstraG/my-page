import type { FCC } from "@/types/react";
import { cn } from "@/functions/cn";
import type { HTMLAttributes } from "react";
import styles from "./Chip.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	size?: "sm" | "md";
}

export const Chip: FCC<Props> = ({ size = "md", children, ...rest }) => (
	<span className={cn(styles.chip, size === "sm" && styles.small)} {...rest}>
		{children}
	</span>
);
