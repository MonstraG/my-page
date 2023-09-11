import { type FC, useEffect, useRef, useState } from "react";
import styles from "@/app/(app)/write/Page.module.scss";

const messageTimeout = 5000;

export const SavedMessage: FC = () => {
	const [shown, setShown] = useState<boolean>(false);

	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const notifyOfSaving = function (e: KeyboardEvent) {
			if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setShown(true);

				if (timeout.current) {
					clearTimeout(timeout.current);
				}

				timeout.current = setTimeout(() => {
					setShown(false);
				}, messageTimeout);
			}
		};

		window.addEventListener("keydown", notifyOfSaving);
		return () => {
			window.removeEventListener("keydown", notifyOfSaving);
		};
	}, []);

	return (
		<p className={styles.message} style={{ opacity: shown ? 1 : 0 }}>
			Your text has been saved in local storage automatically
		</p>
	);
};
