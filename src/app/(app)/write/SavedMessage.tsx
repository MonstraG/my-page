import type { FC } from "react";
import styles from "@/app/(app)/write/Page.module.scss";

interface Props {
	shown: boolean;
}

export const SavedMessage: FC<Props> = ({ shown }) => (
	<p className={styles.message} style={{ opacity: shown ? 1 : 0 }}>
		Your text has been saved in local storage
	</p>
);
