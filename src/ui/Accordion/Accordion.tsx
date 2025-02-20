import styles from "./Accordion.module.css";
import type { FC, HTMLAttributes, ReactNode } from "react";
import type { FCC } from "@/types/react";
import clsx from "clsx";

interface AccordionProps extends HTMLAttributes<HTMLDetailsElement> {
	summary: ReactNode;
}

export const Accordion: FCC<AccordionProps> = ({ summary, children, className, ...rest }) => (
	<details className={clsx(styles.details, className)} {...rest}>
		<summary className={styles.summary}>{summary}</summary>
		<div className={styles.content}>{children}</div>
	</details>
);

interface AccordionGroupProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Should hide outer border
	 */
	embedded?: boolean;
}

export const AccordionGroup: FC<AccordionGroupProps> = ({
	children,
	embedded,
	className,
	...rest
}) => (
	<div className={clsx(styles.accordionGroup, embedded && styles.embedded, className)} {...rest}>
		{children}
	</div>
);
