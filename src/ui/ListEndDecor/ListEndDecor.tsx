import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";
import styles from "./ListEndDecor.module.css";

export const ListEndDecor: FC = () => (
	<Stack gap={1} className={styles.container}>
		<div className={styles.line} />
		<div className={styles.line} />
	</Stack>
);
