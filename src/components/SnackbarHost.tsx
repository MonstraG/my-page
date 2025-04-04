"use client";
import { Snackbar } from "@/ui/Snackbar/Snackbar";
import type { FC } from "react";
import { create } from "zustand";

const useSnackbarStore = create<{
	content: string;
	severity: "error" | "normal";
	key: number;
	open: boolean;
}>(() => ({ content: "", severity: "normal", key: 0, open: false }));

let timeout: ReturnType<typeof setTimeout> | null = null;

export function openSnackbar(severity: "error" | "normal", content: string): void {
	if (timeout) {
		clearTimeout(timeout);
	}

	useSnackbarStore.setState({ content, severity, key: new Date().valueOf(), open: true });
	timeout = setTimeout(() => {
		useSnackbarStore.setState({ open: false });
	}, 3500);
}

function handleClose() {
	if (timeout) {
		clearTimeout(timeout);
	}
	useSnackbarStore.setState({ open: false });
}

export const SnackbarHost: FC = () => {
	const snackbarStore = useSnackbarStore();

	return (
		<Snackbar
			key={snackbarStore.key}
			open={snackbarStore.open}
			severity={snackbarStore.severity}
			onClick={handleClose}
		>
			{snackbarStore.content}
		</Snackbar>
	);
};
