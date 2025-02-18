import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SetStateAction } from "react";

export const languages = [
	{
		iso: "en",
		label: "English"
	},
	{
		iso: "no",
		label: "Norsk"
	},
	{
		iso: "ru",
		label: "Русский"
	},
	{
		iso: "pt",
		label: "Português"
	},
	{
		iso: "es",
		label: "Español"
	}
] as const;

export type Language = (typeof languages)[number]["iso"];

export interface WordState {
	progress: Partial<Record<Language, LanguageProgress>>;
}

export interface LanguageProgress {
	currentIndex: number;
	known: number[];
	unknown: number[];
	invalid: number[];
	earliestUnknown: number | null;
	lastKnownBeforeUnknown: number | null;
}

const emptyWordsStore: WordState = {
	progress: {}
};

export const emptyLanguageProgress: LanguageProgress = {
	currentIndex: 5000,
	known: [],
	unknown: [],
	invalid: [],
	earliestUnknown: null,
	lastKnownBeforeUnknown: null
};

export const useWordsStore = create<WordState>()(
	persist(() => emptyWordsStore, {
		name: "words",
		version: 2,
		migrate: () => emptyWordsStore
	})
);

export const setProgress = (language: Language, action: SetStateAction<LanguageProgress>): void => {
	useWordsStore.setState((prev) => {
		const prevProgress = prev.progress[language];

		let newProgress: LanguageProgress | undefined;
		if (typeof action === "function") {
			newProgress = action(prevProgress ?? emptyLanguageProgress);
		} else {
			newProgress = action;
		}

		return {
			...prev,
			progress: {
				...prev.progress,
				[language]: newProgress
			}
		};
	});
};
