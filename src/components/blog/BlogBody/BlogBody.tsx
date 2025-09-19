import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./BlogBody.module.css";
import type { FCC } from "@/types/react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export const BlogBody: FCC<Props> = ({ className, ...props }) => (
	<div className={clsx(styles.blogBody, className)} {...props} />
);
