"use client";

import { type FC } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const MediaToggleButton: FC = () => {
	const { mode, setMode } = useColorScheme();

	return (
		<Button
			color="neutral"
			onClick={() => {
				setMode(mode === "dark" ? "light" : "dark");
			}}
			size="sm"
			variant="plain"
			sx={{
				paddingInline: 0.75,
				position: "absolute",
				right: 8,
				top: 8
			}}
		>
			{mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
		</Button>
	);
};
