import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	size: 1 | 2 | 3 | 4 | 5 | 6;
}

// containing span required to not break spinner with certain user's wishes (like transform)
export const Spinner: FC<Props> = ({ className, size, ...rest }) => (
	<div className={cn(styles.container, className)}>
		<span className={cn(styles.spinner, styles[`size-${size}`])} {...rest} />
	</div>
);
