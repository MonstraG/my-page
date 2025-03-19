"use client";
import { Snackbar } from "@/ui/Snackbar/Snackbar";
import { type FC, useCallback } from "react";
import { create } from "zustand";

const useSnackbarStore = create<{
	content: string;
	severity: "error" | "normal";
	key: number;
	open: boolean;
}>(() => ({ content: "", severity: "normal", key: 0, open: false }));

let timeout: ReturnType<typeof setTimeout> | null = null;

export const openSnackbar = (severity: "error" | "normal", content: string): void => {
	if (timeout) {
		clearTimeout(timeout);
	}

	useSnackbarStore.setState({ content, severity, key: new Date().valueOf(), open: true });
	timeout = setTimeout(() => {
		useSnackbarStore.setState({ open: false });
	}, 3500);
};

export const SnackbarHost: FC = () => {
	const snackbarStore = useSnackbarStore();

	const handleClose = useCallback(() => {
		if (timeout) {
			clearTimeout(timeout);
		}
		useSnackbarStore.setState({ open: false });
	}, []);

	return (
		<>
			<Snackbar
				open={snackbarStore.open}
				severity={snackbarStore.severity}
				key={snackbarStore.key}
				onClick={handleClose}
			>
				{snackbarStore.content}
			</Snackbar>
		</>
	);
};
