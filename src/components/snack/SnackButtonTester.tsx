"use client";
import { useOpenSnackbar } from "@/components/snack/Snackbars.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import type { FC } from "react";

export const SnackButtonTester: FC = () => {
	const openSnack = useOpenSnackbar();

	return (
		<Button style={{ alignSelf: "start" }} onClick={() => openSnack("normal", "Hey!")}>
			Open snack!
		</Button>
	);
};
