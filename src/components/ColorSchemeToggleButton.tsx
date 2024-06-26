"use client";
import { type FC } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useHasRendered } from "@/components/useHasRendered";

export const ColorSchemeToggleButton: FC = () => {
	const { mode, setMode } = useColorScheme();
	const rendered = useHasRendered();

	if (!rendered) {
		return (
			<Button color="neutral" disabled size="sm" variant="plain" sx={{ px: 0.75 }}>
				<LightModeIcon />
			</Button>
		);
	}

	return (
		<Button
			color="neutral"
			onClick={() => {
				setMode(mode === "dark" ? "light" : "dark");
			}}
			size="sm"
			variant="plain"
			sx={{ px: 0.75 }}
		>
			{mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
		</Button>
	);
};
