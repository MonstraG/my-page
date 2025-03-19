import type { FC, HTMLAttributes } from "react";
import styles from "./ContributionColumn.module.css";

export const ContributionColumn: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<div className={styles.column} {...props} />
);
