import { Inter } from "next/font/google";
import { extendTheme } from "@mui/joy";

// based on https://github.com/mui/material-ui/blob/next/examples/joy-ui-nextjs-ts/src/components/ThemeRegistry/theme.ts

const inter = Inter({
	subsets: ["latin", "cyrillic", "cyrillic-ext"],
	adjustFontFallback: false, // prevent NextJS from adding its own fallback font
	fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
	display: "swap"
});

export const theme = extendTheme({
	fontFamily: {
		body: inter.style.fontFamily,
		display: inter.style.fontFamily
	}
});
