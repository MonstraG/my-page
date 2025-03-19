import type { FC, HTMLAttributes } from "react";
import styles from "./ContributionLabel.module.css";

export const ContributionLabel: FC<HTMLAttributes<HTMLSpanElement>> = (props) => (
	<span className={styles.label} {...props} />
);
