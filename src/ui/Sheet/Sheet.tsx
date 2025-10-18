import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes } from "react";
import styles from "./Sheet.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	elevation?: 1 | 2;
}

export const Sheet: FC<Props> = ({ elevation = 1, className, ...rest }) => (
	<div className={cn(styles.sheet, styles[`elevation-${elevation}`], className)} {...rest} />
);
