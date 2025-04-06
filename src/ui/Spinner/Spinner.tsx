import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	size: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Spinner: FC<Props> = ({ className, size, ...rest }) => {
	return <span className={clsx(styles.spinner, styles[`size-${size}`], className)} {...rest} />;
};
