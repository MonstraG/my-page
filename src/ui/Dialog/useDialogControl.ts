import { useState } from "react";

export interface DialogControl<T = unknown> {
	isOpen: boolean;
	context: T | null;
	handleOpen: (newContext: T) => void;
	handleClose: () => void;
}

export const useDialogControl = <T>(): DialogControl<T> => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [context, setContext] = useState<T | null>(null);

	return {
		isOpen,
		context,
		handleOpen: (newContext: T) => {
			setContext(newContext);
			setIsOpen(true);
		},
		handleClose: () => setIsOpen(false),
	};
};
