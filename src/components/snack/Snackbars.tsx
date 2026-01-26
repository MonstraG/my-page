"use client";
import { Snackbar } from "@/ui/Snackbar/Snackbar";
import { Stack } from "@/ui/Stack/Stack";
import {
	createContext,
	type SetStateAction,
	type FC,
	type ReactNode,
	useContext,
	useState,
} from "react";
import { applySetStateAction } from "@/functions/applySetStateAction";

export interface SnackContext {
	content: string;
	severity: "error" | "normal";
	id: number;
	open: boolean;
	closeTimeout: ReturnType<typeof setTimeout>;
}

const animationTime = 200;
const stayTime = 6000;

const SnackbarContext = createContext<
	((severity: "error" | "normal", content: string) => void) | null
>(null);

export function useOpenSnackbar() {
	const context = useContext(SnackbarContext);
	if (context == null) {
		throw new Error(`Not inside SnackbarContext`);
	}

	return context;
}

export const SnackbarContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [value, setValue] = useState<SnackContext[]>([]);

	const openSnackbar = (severity: "error" | "normal", content: string): void => {
		const id = Date.now();

		setValue((prev) => {
			return prev.concat({
				content,
				severity,
				id,
				open: true,
				closeTimeout: setTimeout(() => {
					closeSnackbar(id);
				}, stayTime),
			});
		});
	};

	const updateSnackbar = (id: number, action: SetStateAction<SnackContext>) => {
		setValue((prev) => {
			const index = prev.findIndex((snack) => snack.id === id);
			if (index === -1) {
				return prev;
			}

			const oldSnack = prev[index];
			const newSnack = applySetStateAction(oldSnack, action);
			return prev.with(index, newSnack);
		});
	};

	const closeSnackbar = (id: number): void => {
		updateSnackbar(id, (prev) => {
			clearTimeout(prev.closeTimeout);
			return { ...prev, open: false };
		});

		setTimeout(() => {
			destroySnackbar(id);
		}, animationTime);
	};

	const destroySnackbar = (id: number) => {
		setValue((prev) => prev.filter((snack) => snack.id !== id));
	};

	return (
		<SnackbarContext.Provider value={openSnackbar}>
			{children}
			<Stack gap={1} style={{ position: "absolute", bottom: 0, right: 0 }}>
				{value.map((snack) => (
					<SnackItem key={snack.id} snack={snack} closeSnackbar={closeSnackbar} />
				))}
			</Stack>
		</SnackbarContext.Provider>
	);
};

const SnackItem: FC<{ snack: SnackContext; closeSnackbar: (id: number) => void }> = ({
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
