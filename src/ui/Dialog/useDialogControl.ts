import type { DialogHandle } from "@/ui/Dialog/Dialog";
import { type RefObject, useCallback, useMemo, useRef, useState } from "react";

export interface DialogControl<T = undefined> {
	context: T | null;
	handleRef: RefObject<DialogHandle | null>;
	handleOpen: (newContext: T) => void;
	handleClose: () => void;
}

export const useDialogControl = <T>(): DialogControl<T> => {
	const [context, setContext] = useState<T | null>(null);

	const handleRef = useRef<DialogHandle | null>(null);

	const handleOpen = useCallback((newContext: T) => {
		setContext(newContext);
		handleRef.current?.open();
	}, []);

	const handleClose = useCallback(() => handleRef.current?.close(), []);

	return useMemo(() => {
		return {
			context,
			handleRef,
			handleOpen,
			handleClose,
		};
	}, [context, handleClose, handleOpen]);
};
