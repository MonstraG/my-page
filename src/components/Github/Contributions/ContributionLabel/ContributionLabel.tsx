import styles from "./ContributionLabel.module.css";
import type { FC, HTMLAttributes } from "react";

export const ContributionLabel: FC<HTMLAttributes<HTMLSpanElement>> = (props) => (
	<span className={styles.label} {...props} />
);
