"use client";
import { Button } from "@/ui/Button/Button.tsx";
import type { FC } from "react";
import { snack } from "@/components/snack/snack.ts";

export const SnackButtonTester: FC = () => {
	return (
		<Button style={{ alignSelf: "start" }} onClick={() => snack("normal", "Hello world!")}>
			Open snack!
		</Button>
	);
};
