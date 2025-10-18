import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes } from "react";
import styles from "./Stack.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	gap?: 0.25 | 0.5 | 1 | 2 | 3 | 4;
	direction?: "row" | "column";
	component?: "div" | "section";
}

export const Stack: FC<Props> = ({ className, gap, direction, component, ...props }) => {
	const resolvedClassName = cn(
		styles.stack,
		direction === "row" ? styles.row : styles.column,
		gap && styles[`gap-${gap}`],
		className,
	);

	if (component === "section") {
		return <section {...props} className={resolvedClassName} />;
	}

	return <div {...props} className={resolvedClassName} />;
};
