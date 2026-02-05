import { useState } from "react";

export interface DialogControl<T = unknown> {
	isOpen: boolean;
	context: T | undefined;
	handleOpen: (newContext: T) => void;
	handleClose: () => void;
}

export const useDialogControl = <T>(): DialogControl<T> => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [context, setContext] = useState<T | undefined>(undefined);

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
