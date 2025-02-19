import styles from "./Paragraph.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
	color?: "gray" | "superGray";
	centered?: boolean;
	size?: "sm" | "md" | "lg";
	noWrap?: boolean;
	component?: "p" | "div";
}

export const Paragraph: FC<Props> = ({
	className,
	color,
	centered = false,
	size = "md",
	noWrap = false,
	component = "p",
	...rest
}) => {
	const classes = clsx(
		styles.text,
		color === "gray" && styles.gray,
		color === "superGray" && styles.superGray,
		centered && styles.center,
		size == "sm" && styles.small,
		size == "lg" && styles.large,
		noWrap && styles.noWrap,
		className
	);

	if (component === "div") {
		return <div className={classes} {...rest} />;
	}
	return <p className={classes} {...rest} />;
};
