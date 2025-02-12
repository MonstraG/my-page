import styles from "./Divider.module.css";
import type { FC } from "react";

export const Divider: FC = () => {
	return <hr className={styles.divider}></hr>;
};
