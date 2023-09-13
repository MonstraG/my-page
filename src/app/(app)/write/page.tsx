"use client";
import { type FC, FormEventHandler } from "react";
import useLocalStorageState from "use-local-storage-state";
import styles from "@/app/(app)/write/Page.module.scss";
import { SavedMessage } from "@/app/(app)/write/SavedMessage";
import { Editable } from "@/app/(app)/write/Editable";

const WritePage: FC = () => {
	const [input, setInput] = useLocalStorageState<string>("write-page", {
		defaultValue: ""
	});

	const handleInput: FormEventHandler<HTMLDivElement> = (event) => {
		setInput(event.currentTarget.innerHTML);
	};

	return (
		<div className={styles.layout}>
			<div />
			<div className={styles.center}>
				<Editable />
			</div>
			<aside className={styles.aside}>
				<SavedMessage />
			</aside>
		</div>
	);
};

export default WritePage;
