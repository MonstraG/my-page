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

export function lazyApplySetStateAction<T>(getPrev: () => T, setStateAction: SetStateAction<T>) {
	if (setStateAction instanceof Function) {
		return setStateAction(getPrev());
	}
	return setStateAction;
}
