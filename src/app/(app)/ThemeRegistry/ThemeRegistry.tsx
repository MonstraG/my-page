"use client";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import NextAppDirEmotionCacheProvider from "@/app/(app)/ThemeRegistry/EmotionRegistry";
import { theme } from "@/app/(app)/ThemeRegistry/theme";
import type { FCC } from "@/types/react";

export const ThemeRegistry: FCC = ({ children }) => (
	<NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
		<CssVarsProvider theme={theme}>
			<CssBaseline />
			{children}
		</CssVarsProvider>
	</NextAppDirEmotionCacheProvider>
);
