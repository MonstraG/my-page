import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes } from "react";
import styles from "./Stack.module.css";

interface Props {
	gap?: 0.25 | 0.5 | 1 | 2 | 3 | 4;
	direction?: "row" | "column";
	component?: "div" | "section" | "article" | "footer";
	style?: HTMLAttributes<HTMLElement>["style"];
	className?: HTMLAttributes<HTMLElement>["className"];
	children?: HTMLAttributes<HTMLElement>["children"];
}

export const Stack: FC<Props> = ({ className, gap, direction, component, ...props }) => {
	const resolvedClassName = cn(
		styles.stack,
		direction === "row" ? styles.row : styles.column, // this makes `column` default
		gap && styles[`gap-${gap}`],
		className,
	);

	if (component === "footer") {
		return <footer {...props} className={resolvedClassName} />;
	}
	if (component === "section") {
		return <section {...props} className={resolvedClassName} />;
	}
	if (component === "article") {
		return <article {...props} className={resolvedClassName} />;
	}

	return <div {...props} className={resolvedClassName} />;
};
