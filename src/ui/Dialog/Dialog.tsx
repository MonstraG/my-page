import { CloseIcon } from "@/icons/material/CloseIcon";
import type { FCC } from "@/types/react";
import { Button } from "@/ui/Button/Button";
import sheetStyles from "@/ui/Sheet/Sheet.module.css";
import { clsx } from "clsx";
import { type RefObject, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./Dialog.module.css";

export interface DialogHandle {
	open: () => void;
	close: () => void;
}

interface Props {
	ref: RefObject<DialogHandle | null>;
}

export const Dialog: FCC<Props> = ({ ref, children }) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const handleClose = useCallback(() => {
		dialogRef.current?.close();
	}, []);

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialogRef.current?.showModal();
			},
			close() {
				handleClose();
			},
		};
	}, [handleClose]);

	useEffect(() => {
		const abortController = new AbortController();

		document.addEventListener(
			"keyup",
			function(event) {
				if (event.code === "Escape") {
					handleClose();
				}
			},
			{ signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, [handleClose]);

	return (
		<dialog className={clsx(sheetStyles.sheet, styles.dialog)} ref={dialogRef}>
			<Button
				endDecorator={<CloseIcon />}
				size="sm"
				onClick={handleClose}
				className={styles.closeButton}
			>
				Close
			</Button>

			{children}
		</dialog>
	);
};
