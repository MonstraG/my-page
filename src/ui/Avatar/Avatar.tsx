import type { FCC } from "@/types/react";
import styles from "./Avatar.module.css";

export const Avatar: FCC = ({ children }) => {
	return <div className={styles.avatar}>{children}</div>;
};
