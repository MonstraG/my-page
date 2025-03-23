import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./Stack.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	gap?: number;
	direction?: "row" | "column";
	component?: "div" | "section";
}

export const Stack: FC<Props> = (
	{ style, className, gap, direction, component = "div", ...props },
) => {
	const resolvedProps = {
		...props,
		className: clsx(styles.stack, direction === "row" ? styles.row : styles.column, className),
		style: {
			...style,
			gap: gap ? gap + "rem" : undefined,
		},
	};

	if (component === "section") {
		return <section {...resolvedProps} />;
	}

	return <div {...resolvedProps} />;
};
