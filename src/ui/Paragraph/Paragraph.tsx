import styles from "./Paragraph.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
	color?: "gray";
	centered?: boolean;
	size?: "sm" | "md" | "lg";
}

export const Paragraph: FC<Props> = ({
	className,
	color,
	centered = false,
	size = "md",
	...props
}) => (
	<p
		className={clsx(
			styles.text,
			color === "gray" && styles.gray,
			centered && styles.center,
			size == "sm" && styles.small,
			size == "lg" && styles.large,
			className
		)}
		{...props}
	/>
);
