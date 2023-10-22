"use client";
import createCache, { type EmotionCache, type Options } from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { useState } from "react";
import type { FCC } from "@/types/react";

// Taken from https://mui.com/joy-ui/integrations/next-js-app-router/
// added couple eslint-disable-next-line, that was necessary.

interface Props {
	options: Options;
}

export const ThemeRegistry: FCC<Props> = ({ options, children }) => {
	// This implementation is from emotion-js
	// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
	const [{ cache, flush }] = useState<{ cache: EmotionCache; flush: () => string[] }>(() => {
		const cache = createCache(options);
		cache.compat = true;
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const prevInsert = cache.insert;
		let inserted: string[] = [];
		cache.insert = (...args) => {
			const serialized = args[1];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push(serialized.name);
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) {
			return null;
		}
		let styles = "";
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(" ")}`}
				dangerouslySetInnerHTML={{ __html: styles }}
			/>
		);
	});

	return (
		<CacheProvider value={cache}>
			<CssVarsProvider>
				<CssBaseline />
				{children}
			</CssVarsProvider>
		</CacheProvider>
	);
};
