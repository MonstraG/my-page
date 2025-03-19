import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./Sheet.module.css";

export const Sheet: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
	<div className={clsx(styles.sheet, className)} {...rest} />
);
