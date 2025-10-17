import type { FCC } from "@/types/react";
import { Sheet } from "@/ui/Sheet/Sheet";
import styles from "./Dialog.module.css";

interface Props {
	isOpen: boolean;
	close: () => void;
}

export const Dialog: FCC<Props> = ({ isOpen, close, children }) => {
	return (
		// biome-ignore lint/a11y/noNoninteractiveElementInteractions: https://github.com/biomejs/biome/issues/7783
		<dialog
			className={styles.dialog}
			ref={(dialog) => {
				if (!dialog) {
					return;
				}

				if (isOpen && !dialog.open) {
					dialog.showModal();
				}
				if (!isOpen && dialog.open) {
					dialog.close();
				}
			}}
			onKeyDown={(event) => {
				// don't close it trough html, only notify control
				event.preventDefault();
				if (event.code === "Escape") {
					close();
				}
			}}
		>
			<Sheet>{children}</Sheet>
		</dialog>
	);
};
