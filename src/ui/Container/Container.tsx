import styles from "./Container.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Container: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<article className={clsx(styles.container, props.className)} {...props} />
);
