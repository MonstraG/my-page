import { useCallback, useState } from "react";

export interface DialogControl<T = undefined> {
	isOpen: boolean;
	context: T | null;
	handleOpen: (newContext: T) => void;
	handleClose: () => void;
}

export const useDialogControl = <T>(): DialogControl<T> => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [context, setContext] = useState<T | null>(null);

	const handleOpen = useCallback((newContext: T) => {
		setContext(newContext);
		setIsOpen(true);
	}, []);

	const handleClose = useCallback(() => setIsOpen(false), []);

	return {
		context,
		isOpen,
		handleOpen,
		handleClose,
	};
};
