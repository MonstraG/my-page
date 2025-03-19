import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./BlogBody.module.css";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export const BlogBody: FC<Props> = ({ className, ...props }) => (
	<div className={clsx(styles.blogBody, className)} {...props} />
);
