import { cn } from "@/functions/cn";
import type { HTMLAttributes } from "react";
import styles from "./BlogBody.module.css";
import type { FCC } from "@/types/react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export const BlogBody: FCC<Props> = ({ className, ...props }) => (
	<div className={cn(styles.blogBody, className)} {...props} />
);
