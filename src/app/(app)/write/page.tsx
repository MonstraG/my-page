"use client";
import { type FC } from "react";
import styles from "@/app/(app)/write/Page.module.scss";
import { SavedMessage } from "@/app/(app)/write/SavedMessage";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/app/(app)/write/Editor"), { ssr: false });

const WritePage: FC = () => {
	return (
		<div className={styles.layout}>
			<div />
			<div className={styles.center}>
				<Editor />
			</div>
			<aside className={styles.aside}>
				<SavedMessage />
			</aside>
		</div>
	);
};

export default WritePage;
