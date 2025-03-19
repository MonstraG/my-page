import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./List.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {}

export const List: FC<Props> = ({ className, ...props }) => (
	<ul className={clsx(styles.list, className)} {...props} />
);
