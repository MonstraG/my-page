import { applySetStateAction } from "@/functions/applySetStateAction";
import type { SetStateAction } from "react";
import { create } from "zustand";

export interface SnackbarContext {
	content: string;
	severity: "error" | "normal";
	id: number;
	open: boolean;
	closeTimeout: ReturnType<typeof setTimeout>;
}

export const useSnackbarStore = create<{ snacks: SnackbarContext[] }>(() => ({ snacks: [] }));

const animationTime = 200;
const stayTime = 6000;

export function openSnackbar(severity: "error" | "normal", content: string): void {
	const id = new Date().valueOf();

	useSnackbarStore.setState((prev) => {
		return ({
			snacks: prev.snacks.concat({
				content,
				severity,
				id: id,
				open: true,
				closeTimeout: setTimeout(() => closeSnackbar(id), stayTime),
			}),
		});
	});
	setTimeout(() => updateSnackbar(id, prev => ({ ...prev, open: true })));
}

export function closeSnackbar(id: number): void {
	updateSnackbar(id, prev => {
		clearTimeout(prev.closeTimeout);
		return ({ ...prev, open: false });
	});

	setTimeout(() => {
		destroySnackbar(id);
	}, animationTime);
}

function destroySnackbar(id: number) {
	useSnackbarStore.setState((prev) => {
		return { snacks: prev.snacks.filter(snack => snack.id !== id) };
	});
}

function updateSnackbar(id: number, action: SetStateAction<SnackbarContext>) {
	useSnackbarStore.setState((prev) => {
		const index = prev.snacks.findIndex(snack => snack.id === id);
		if (index === -1) {
			return prev;
		}

		const oldSnack = prev.snacks[index];
		const newSnack = applySetStateAction(oldSnack, action);
		return { snacks: prev.snacks.with(index, newSnack) };
	});
}
