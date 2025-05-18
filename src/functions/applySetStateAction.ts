import type { SetStateAction } from "react";

export function applySetStateAction<T extends object>(
	prev: T,
	setStateAction: SetStateAction<T>,
): T {
	if (typeof setStateAction === "function") {
		return setStateAction(prev);
	}
	return setStateAction;
}
