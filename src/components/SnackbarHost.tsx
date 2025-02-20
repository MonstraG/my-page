"use client";
import { type FC, useCallback } from "react";
import { create } from "zustand";
import { Snackbar } from "@/ui/Snackbar/Snackbar";

const useSnackbarStore = create<{
	content: string;
	key: number;
	open: boolean;
}>(() => ({ content: "", key: 0, open: false }));

let timeout: ReturnType<typeof setTimeout> | null = null;

export const openSnackbar = (content: string): void => {
	if (timeout) {
		clearTimeout(timeout);
	}

	useSnackbarStore.setState({ content, key: new Date().valueOf(), open: true });
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
			<Snackbar open={snackbarStore.open} key={snackbarStore.key} onClick={handleClose}>
				{snackbarStore.content}
			</Snackbar>
		</>
	);
};
