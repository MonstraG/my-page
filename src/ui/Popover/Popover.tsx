import type { FC, ReactNode } from "react";
import { Sheet } from "@/ui/Sheet/Sheet.tsx";
import styles from "./Popover.module.css";

interface Props {
	anchor: { left: number; top: number } | undefined;
	isOpen: boolean;
	close: () => void;
	children: ReactNode;
}

export const Popover: FC<Props> = ({ anchor, isOpen, close, children }) => (
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
			if (event.code === "Escape") {
				event.preventDefault(); // don't close it trough html
				close(); // only notify control
			}
		}}
		onClick={(event) => {
			// clicks on backdrop count as clicks on dialog
			if (event.target instanceof HTMLDialogElement) {
				close();
			}
		}}
	>
		<Sheet
			style={{
				maxWidth: "300px",
				position: "fixed",
				left: anchor?.left,
				top: anchor?.top,
				padding: 0,
			}}
		>
			{children}
		</Sheet>
	</dialog>
);
