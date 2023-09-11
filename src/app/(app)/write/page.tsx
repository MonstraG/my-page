"use client";
import type { FC } from "react";
import useLocalStorageState from "use-local-storage-state";
import styles from "@/app/(app)/write/Page.module.scss";
import { Container } from "@/components/Container/Container";

const WritePage: FC = () => {
	const [input, setInput] = useLocalStorageState<string>("write-page");

	return (
		<div>
			<Container>
				<textarea
					className={styles.textarea}
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					placeholder="Start writing here"
				/>
			</Container>
		</div>
	);
};

export default WritePage;
