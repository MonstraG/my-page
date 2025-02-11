import type { FCC } from "@/types/react";
import styles from "./Container.module.css";

export const Container: FCC = ({ children }) => {
	return <article className={styles.container}>{children}</article>;
};
