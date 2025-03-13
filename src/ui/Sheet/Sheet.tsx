import styles from "./Sheet.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Sheet: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
	<div className={clsx(styles.sheet, className)} {...rest} />
);
