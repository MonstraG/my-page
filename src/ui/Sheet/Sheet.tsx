import styles from "./Sheet.module.css";
import type { FC, HTMLAttributes } from "react";

export const Sheet: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
	<div className={styles.sheet} {...props} />
);
