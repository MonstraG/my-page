import styles from "./Accordion.module.css";
import type { HTMLAttributes, ReactNode } from "react";
import type { FCC } from "@/types/react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDetailsElement> {
	summary: ReactNode;
}

export const Accordion: FCC<Props> = ({ summary, children, className, ...rest }) => (
	<details className={clsx(styles.details, className)} {...rest}>
		<summary>{summary}</summary>
		{children}
	</details>
);
