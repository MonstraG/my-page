import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./List.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {
	disableGutters?: boolean;
}

export const List: FC<Props> = ({ className, disableGutters, ...props }) => (
	<ul
		className={clsx(styles.list, disableGutters && styles.disableGutters, className)}
		{...props}
	/>
);
