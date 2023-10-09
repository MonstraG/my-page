"use client";

import { FC, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styles from "@/app/(app)/MediaToggleButton.module.scss";

export const MediaToggleButton: FC = () => {
	const [theme, setTheme] = useLocalStorageState<"light" | "dark">("theme");
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		setTheme((prev) => {
			if (prev === undefined) {
				const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
				if (systemSettingDark.matches) {
					return "dark";
				}
				return "light";
			}
			return prev;
		});
	}, [setTheme]);

	return (
		<button
			className={styles.mediaToggleButton}
			onClick={() => {
				setTheme((prev) => (prev === "light" ? "dark" : "light"));
			}}
		>
			{theme === "light" ? "Light mode" : "Dark mode"}
		</button>
	);
};
