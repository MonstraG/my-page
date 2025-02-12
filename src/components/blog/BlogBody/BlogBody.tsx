import styles from "./BlogBody.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export const BlogBody: FC<Props> = ({ className, ...props }) => (
	<div className={clsx(styles.blogBody, className)} {...props} />
);
