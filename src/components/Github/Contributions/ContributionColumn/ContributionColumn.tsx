import styles from "./ContributionColumn.module.css";
import type { FC, HTMLAttributes } from "react";

export const ContributionColumn: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<div className={styles.column} {...props} />
);
