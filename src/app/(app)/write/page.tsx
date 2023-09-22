"use client";
import { type FC, useCallback } from "react";
import styles from "@/app/(app)/write/Page.module.scss";
import { SavedMessage } from "@/app/(app)/write/SavedMessage";
import dynamic from "next/dynamic";
import useLocalStorageState from "use-local-storage-state";
import { useDisappearingMessage } from "@/app/(app)/write/useDisappearingMessage";

const Editor = dynamic(() => import("@/app/(app)/write/Editor"), { ssr: false });

const WritePage: FC = () => {
	const [value, _setValue] = useLocalStorageState<string | undefined>("write-page");

	const { shown, appear } = useDisappearingMessage();

	const setValue = useCallback(
		(value: string | undefined) => {
			appear();
			_setValue(value);
		},
		[appear, _setValue]
	);

	return (
		<div className={styles.layout}>
			<div />
			<div className={styles.center}>
				<Editor value={value} setValue={setValue} />
			</div>
			<aside className={styles.aside}>
				<SavedMessage shown={shown} />
			</aside>
		</div>
	);
};

export default WritePage;
