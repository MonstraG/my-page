import styles from "./Paragraph.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
	color?: "gray";
}

export const Paragraph: FC<Props> = ({ className, color, ...props }) => (
	<p className={clsx(styles.text, color === "gray" && styles.gray, className)} {...props} />
);
