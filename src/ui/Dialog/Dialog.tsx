import type { FCC } from "@/types/react";
import { Sheet } from "@/ui/Sheet/Sheet";

const sheetStyle = { maxWidth: "900px" };

interface Props {
	isOpen: boolean;
	close: () => void;
}

export const Dialog: FCC<Props> = ({ isOpen, close, children }) => (
	<dialog
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
				// don't close it trough html, only notify control
				event.preventDefault();
				close();
			}
		}}
	>
		<Sheet style={sheetStyle}>{children}</Sheet>
	</dialog>
);
