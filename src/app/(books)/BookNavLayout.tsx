"use client";
import { ColorSchemeToggleButton } from "@/components/ColorSchemeToggleButton";
import { SnackbarHost } from "@/components/SnackbarHost";
import { NavDrawer } from "@/app/(app)/NavDrawer";
import type { FCC } from "@/types/react";
import { useState } from "react";
import Stack from "@mui/joy/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import type { SxProps } from "@mui/joy/styles/types";
import { useBookControlsStore } from "@/app/(books)/useBookControlsStore";
import { useColorScheme } from "@mui/joy/styles";
import { useHasRendered } from "@/components/useHasRendered";
import Container from "@mui/joy/Container";
import { EB_Garamond } from "next/font/google";
import { BookSettings } from "@/app/(books)/BookSettings";

const garamond = EB_Garamond({
	subsets: ["latin", "cyrillic", "cyrillic-ext"],
	adjustFontFallback: false, // prevent Next.js from adding its own fallback font
	fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
	display: "swap"
});

const sepiaSx: SxProps = {
	background: "#F4ECD8",
	color: "#5F4B32"
};

export const BookNavLayout: FCC = ({ children }) => {
	const { wide, justify, fontSize, fontWeight, fontFamily } = useBookControlsStore();
	const { mode } = useColorScheme();

	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

	const rendered = useHasRendered();
	if (!rendered) {
		return null;
	}

	const fontFamilyStyles = (() => {
		switch (fontFamily) {
			case "Garamond":
				return garamond.style;
			case "Inter":
				return {
					// default font for website
				};
			case "system sans-serif":
				return {
					fontFamily: "sans-serif"
				};
			case "system serif":
				return {
					fontFamily: "serif"
				};
		}
	})();

	return (
		<Box sx={mode === "light" ? sepiaSx : undefined}>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				component="header"
				sx={{
					position: "sticky",
					top: 0,
					p: 1,
					zIndex: 10,
					elevation: 1
				}}
			>
				<IconButton
					variant="outlined"
					color="neutral"
					onClick={() => {
						setDrawerOpen(true);
					}}
				>
					<MenuIcon />
				</IconButton>

				<div>
					<ColorSchemeToggleButton />
					<BookSettings />
				</div>
			</Stack>
			<Container
				maxWidth={wide ? false : "md"}
				style={{
					...fontFamilyStyles,
					fontSize,
					fontWeight,
					textAlign: justify ? "justify" : undefined
				}}
				component="main"
			>
				{children}
			</Container>
			<SnackbarHost />
			<NavDrawer
				isOpen={drawerOpen}
				onClose={() => {
					setDrawerOpen(false);
				}}
			/>
		</Box>
	);
};
