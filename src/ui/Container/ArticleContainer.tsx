import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./Container.module.css";

export const ArticleContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<article className={clsx(styles.container, props.className)} {...props} />
);
