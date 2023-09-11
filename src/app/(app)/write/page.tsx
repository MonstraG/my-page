"use client";
import type { FC } from "react";
import useLocalStorageState from "use-local-storage-state";
import styles from "@/app/(app)/write/Page.module.scss";

const WritePage: FC = () => {
	const [input, setInput] = useLocalStorageState<string>("write-page");

	return (
		<div>
			<textarea
				className={styles.textarea}
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				placeholder="Start writing here"
			/>
		</div>
	);
};

export default WritePage;
