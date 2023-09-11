"use client";
import { type FC } from "react";
import useLocalStorageState from "use-local-storage-state";
import styles from "@/app/(app)/write/Page.module.scss";
import { SavedMessage } from "@/app/(app)/write/SavedMessage";

const WritePage: FC = () => {
	const [input, setInput] = useLocalStorageState<string>("write-page");

	return (
		<div className={styles.layout}>
			<div />
			<textarea
				className={styles.textarea}
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				placeholder="Start writing here"
			/>
			<aside className={styles.aside}>
				<SavedMessage />
			</aside>
		</div>
	);
};

export default WritePage;
