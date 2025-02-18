"use client";
import Snackbar, { type SnackbarProps } from "@mui/joy/Snackbar";
import type { FC } from "react";
import { create } from "zustand";

const useSnackbarStore = create<{
	props: Omit<SnackbarProps, "open" | "key">;
	key: number;
	open: boolean;
}>(() => ({ props: {}, key: 0, open: false }));

export const openSnackbar = (props: Omit<SnackbarProps, "open" | "key">): void => {
	useSnackbarStore.setState({ props, key: new Date().valueOf(), open: true });
};

export const SnackbarHost: FC = () => {
	const snackbarStore = useSnackbarStore();

	const handleClose: SnackbarProps["onClose"] = (e, reason) => {
		useSnackbarStore.setState({ open: false });
		snackbarStore.props.onClose?.(e, reason);
	};

	return (
		<Snackbar
			autoHideDuration={3500}
			{...snackbarStore.props}
			open={snackbarStore.open}
			onClose={handleClose}
			key={snackbarStore.key}
		/>
	);
};
