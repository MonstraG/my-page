import styles from "./List.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends HTMLAttributes<HTMLUListElement> {}

export const List: FC<Props> = ({ className, ...props }) => (
	<ul className={clsx(styles.list, className)} {...props} />
);
