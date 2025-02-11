"use client";
import { CssVarsProvider } from "@mui/joy/styles";
import NextAppDirEmotionCacheProvider from "@/components/theme/EmotionRegistry";
import { theme } from "@/components/theme/theme";
import type { FCC } from "@/types/react";

export const ThemeRegistry: FCC = ({ children }) => (
	<NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
		<CssVarsProvider theme={theme} defaultColorScheme="dark" defaultMode="dark">
			{children}
		</CssVarsProvider>
	</NextAppDirEmotionCacheProvider>
);
