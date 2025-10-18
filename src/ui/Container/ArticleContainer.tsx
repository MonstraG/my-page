import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes } from "react";
import styles from "./Container.module.css";

export const ArticleContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<article className={cn(styles.container, props.className)} {...props} />
);
