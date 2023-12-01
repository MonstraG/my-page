"use client";
import { type FC, useEffect, useState } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const MediaToggleButton: FC = () => {
	const { mode, setMode } = useColorScheme();
	const [rendered, setRendered] = useState<boolean>(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setRendered(true);
		}
	}, []);

	if (!rendered) {
		return (
			<Button
				color="neutral"
				disabled
				size="sm"
				variant="plain"
				sx={{
					paddingInline: 0.75,
					position: "absolute",
					right: 8,
					top: 8
				}}
			>
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
