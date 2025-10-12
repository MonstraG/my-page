import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./Paragraph.module.css";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
	color?: "gray" | "superGray" | "error";
	centered?: boolean;
	size?: "sm" | "md" | "lg";
	noWrap?: boolean;
	component?: "p" | "div" | "span";
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
	const resolvedClassName = clsx(
		styles.text,
		color === "gray" && styles.gray,
		color === "superGray" && styles.superGray,
		color === "error" && styles.error,
		centered && styles.center,
		size === "sm" && styles.small,
		size === "lg" && styles.large,
		noWrap && styles.noWrap,
		className,
	);

	if (component === "span") {
		return <span className={resolvedClassName} {...rest} />;
	}
	if (component === "div") {
		return <div className={resolvedClassName} {...rest} />;
	}
	return <p className={resolvedClassName} {...rest} />;
};
