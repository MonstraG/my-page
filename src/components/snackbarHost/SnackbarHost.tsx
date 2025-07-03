"use client";
import {
	closeSnackbar,
	type SnackbarContext,
	useSnackbarStore,
} from "@/components/snackbarHost/useSnackbarStore";
import { Snackbar } from "@/ui/Snackbar/Snackbar";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

export const SnackbarHost: FC = () => {
	const snackbarStore = useSnackbarStore();

	return (
		<Stack gap={1} style={{ position: "absolute", bottom: 0, right: 0 }}>
			{snackbarStore.snacks.map(snack => <SnackItem key={snack.id} snack={snack} />)}
		</Stack>
	);
};

const SnackItem: FC<{ snack: SnackbarContext }> = ({ snack }) => (
	<Snackbar
		key={snack.id}
		open={snack.open}
		severity={snack.severity}
		onCloseClock={() => closeSnackbar(snack.id)}
	>
		{snack.content}
	</Snackbar>
);
