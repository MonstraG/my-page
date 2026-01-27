import { cn } from "@/functions/cn";
import type { ComponentProps, FC } from "react";
import styles from "./Stack.module.css";

interface Props extends Omit<ComponentProps<"div">, "dir"> {
	gap?: 0.25 | 0.5 | 1 | 2 | 3 | 4;
	direction?: "row" | "column";
	component?: "div" | "section";
}

export const Stack: FC<Props> = ({ className, gap, direction, component, ...props }) => {
	const resolvedClassName = cn(
		styles.stack,
		direction === "row" ? styles.row : styles.column, // this makes `column` default
		gap && styles[`gap-${gap}`],
		className,
	);

	if (component === "section") {
		return <section {...props} className={resolvedClassName} />;
	}

	return <div {...props} className={resolvedClassName} />;
};
