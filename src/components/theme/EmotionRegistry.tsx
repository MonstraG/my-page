"use client";
import * as React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import type { EmotionCache, Options as OptionsOfCreateCache } from "@emotion/cache";
import type { ReactElement } from "react";

export interface NextAppDirEmotionCacheProviderProps {
	/** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
	options: Omit<OptionsOfCreateCache, "insertionPoint">;
	/** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
	CacheProvider?: React.ElementType<{ value: EmotionCache }>;
	children: React.ReactNode;
}

export default function NextAppDirEmotionCacheProvider(
	props: NextAppDirEmotionCacheProviderProps
): ReactElement {
	const { options, children } = props;

	const [{ cache, flush }] = React.useState(() => {
		const cache = createCache(options);
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted: string[] = [];
		cache.insert = (...args) => {
			const serialized = args[1];
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
			styles += (cache.inserted[name] ?? "").toString();
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(" ")}`}
				dangerouslySetInnerHTML={{
					__html: styles
				}}
			/>
		);
	});

	return <CacheProvider value={cache}>{children}</CacheProvider>;
}
