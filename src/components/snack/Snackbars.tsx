"use client";
import { Snackbar } from "@/ui/Snackbar/Snackbar";
import { Stack } from "@/ui/Stack/Stack";
import { type SetStateAction, type FC, useState, useEffect, useCallback } from "react";
import { applySetStateAction } from "@/functions/applySetStateAction";
import { snackEventName, type SnackSeverity } from "@/components/snack/snack.ts";

interface SnackData {
	content: string;
	severity: SnackSeverity;
	id: number;
	open: boolean;
	closeTimeout: ReturnType<typeof setTimeout>;
}

const animationTime = 200;
const stayTime = 6000;

export const SnackbarHost: FC = () => {
	const [value, setValue] = useState<SnackData[]>([]);

	const updateSnackbar = useCallback((id: number, action: SetStateAction<SnackData>) => {
		setValue((prev) => {
			const index = prev.findIndex((snack) => snack.id === id);
			if (index === -1) {
				return prev;
			}

			const oldSnack = prev[index];
			const newSnack = applySetStateAction(oldSnack, action);
			return prev.with(index, newSnack);
		});
	}, []);

	const destroySnackbar = useCallback((id: number) => {
		setValue((prev) => prev.filter((snack) => snack.id !== id));
	}, []);

	const closeSnackbar = useCallback(
		(id: number): void => {
			updateSnackbar(id, (prev) => {
				clearTimeout(prev.closeTimeout);
				return { ...prev, open: false };
			});

			setTimeout(() => {
				destroySnackbar(id);
			}, animationTime);
		},
		[destroySnackbar, updateSnackbar],
	);

	useEffect(() => {
		const abortController = new AbortController();

		window.addEventListener(
			snackEventName,
			(event) => {
				if (
					!(event instanceof CustomEvent) ||
					typeof event.detail !== "object" ||
					event.detail == null ||
					!("content" in event.detail) ||
					!("severity" in event.detail) ||
					typeof event.detail.content !== "string" ||
					typeof event.detail.severity !== "string"
				) {
					console.warn("Invalid event for snacks:", event);
					return;
				}

				setValue((prev) => {
					const id = Date.now();
					return prev.concat({
						content: event.detail.content,
						severity: event.detail.content,
						id,
						open: true,
						closeTimeout: setTimeout(() => {
							closeSnackbar(id);
						}, stayTime),
					});
				});
			},
			{ signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, [closeSnackbar]);

	return (
		<Stack gap={1} style={{ position: "absolute", bottom: 0, right: 0 }}>
			{value.map((snack) => (
				<SnackItem key={snack.id} snack={snack} closeSnackbar={closeSnackbar} />
			))}
		</Stack>
	);
};

const SnackItem: FC<{ snack: SnackData; closeSnackbar: (id: number) => void }> = ({
	snack,
	closeSnackbar,
}) => (
	<Snackbar
		key={snack.id}
		open={snack.open}
		severity={snack.severity}
		onCloseClock={() => {
			closeSnackbar(snack.id);
		}}
	>
		{snack.content}
	</Snackbar>
);
