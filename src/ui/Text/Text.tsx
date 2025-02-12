import styles from "./Text.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends HTMLAttributes<HTMLSpanElement> {}

export const Text: FC<Props> = ({ className, ...props }) => (
	<span className={clsx(styles.text, className)} {...props} />
);
