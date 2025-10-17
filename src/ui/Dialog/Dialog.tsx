import type { FCC } from "@/types/react";
import { Sheet } from "@/ui/Sheet/Sheet";
import { type KeyboardEvent, useCallback } from "react";
import styles from "./Dialog.module.css";

interface Props {
	isOpen: boolean;
	close: () => void;
}

export const Dialog: FCC<Props> = ({ isOpen, close, children }) => {
	const syncDialog = useCallback(
		(dialog: HTMLDialogElement | null) => {
			if (!dialog) {
				return;
			}

			if (isOpen && !dialog.open) {
				dialog.showModal();
			}
			if (!isOpen && dialog.open) {
				dialog.close();
			}
		},
		[isOpen],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDialogElement>) => {
			// don't close it trough html, only notify control
			event.preventDefault();
			if (event.code === "Escape") {
				close();
			}
		},
		[close],
	);

	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: https://github.com/biomejs/biome/issues/7783
		<dialog className={styles.dialog} ref={syncDialog} onKeyDown={handleKeyDown}>
			<Sheet>{children}</Sheet>
		</dialog>
	);
};
