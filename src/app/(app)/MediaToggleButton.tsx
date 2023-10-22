"use client";

import { type FC } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";

export const MediaToggleButton: FC = () => {
	const { mode, setMode } = useColorScheme();
	return (
		<Button
			variant="outlined"
			color="neutral"
			onClick={() => {
				setMode(mode === "dark" ? "light" : "dark");
			}}
		>
			{mode === "dark" ? "Turn light" : "Turn dark"}
		</Button>
	);
};
