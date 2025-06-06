import { applySetStateAction } from "@/functions/applySetStateAction";
import type { SetStateAction } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const languages = [
	{
		iso: "en",
		label: "English",
	},
	{
		iso: "no",
		label: "Norsk",
	},
	{
		iso: "ru",
		label: "Русский",
	},
	{
		iso: "pt",
		label: "Português",
	},
	{
		iso: "es",
		label: "Español",
	},
] as const;

export type Language = (typeof languages)[number]["iso"];

interface WordState {
	progress: Partial<Record<Language, LanguageProgress>>;
}

export interface LanguageProgress {
	currentIndex: number;
	known: readonly number[];
	unknown: readonly number[];
	invalid: readonly number[];
	earliestUnknown: number | null;
	lastKnownBeforeUnknown: number | null;
}

const emptyWordsStore: WordState = {
	progress: {},
};

const emptyLanguageProgress: LanguageProgress = {
	currentIndex: 5000,
	known: [],
	unknown: [],
	invalid: [],
	earliestUnknown: null,
	lastKnownBeforeUnknown: null,
};

const useWordsStore = create<WordState>()(
	persist(() => emptyWordsStore, {
		name: "words",
		version: 2,
		migrate: () => emptyWordsStore,
	}),
);

export function useWordsStoreForLanguage(language: Language): LanguageProgress {
	return useWordsStore((wordState) => wordState.progress[language] ?? emptyLanguageProgress);
}

export const setProgress = (language: Language, action: SetStateAction<LanguageProgress>): void => {
	useWordsStore.setState((prev) => {
		const oldProgress = prev.progress[language];
		const newProgress = applySetStateAction(oldProgress ?? emptyLanguageProgress, action);

		return {
			...prev,
			progress: {
				...prev.progress,
				[language]: newProgress,
			},
		};
	});
};
