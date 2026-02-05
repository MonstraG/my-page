import { useDialogControl } from "@/ui/Dialog/useDialogControl.ts";
import type { MouseEvent } from "react";

export interface PopoverControl<T = unknown> {
	isOpen: boolean;
	anchor: { left: number; top: number } | undefined;
	context: T | undefined;
	handleOpen: (event: MouseEvent<unknown>, context: T) => void;
	handleClose: () => void;
}

export function usePopoverControl<T = undefined>(): PopoverControl<T> {
	const dialogControl = useDialogControl<{
		anchor: { left: number; top: number };
		context: T;
	}>();

	return {
		...dialogControl,
		anchor: dialogControl.context?.anchor,
		context: dialogControl.context?.context,
		handleOpen: (event: MouseEvent<unknown>, context) => {
			event.preventDefault();
			dialogControl.handleOpen({
				anchor: { left: event.clientX, top: event.clientY },
				context,
			});
		},
	};
}
