import { applySetStateAction } from "@/functions/applySetStateAction";
import type { SetStateAction } from "react";
import { useStorageState } from "@/functions/useStorageState.ts";
import { createLocalStorage } from "@/functions/createLocalStorage.ts";
import type { Language } from "@/components/words/languages.ts";

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

const storageConfig = createLocalStorage("words", emptyWordsStore);

export function useLanguageProgress(language: Language): LanguageProgress {
	const [wordsState] = useStorageState(storageConfig);

	return wordsState.progress[language] ?? emptyLanguageProgress;
}

export function useSetLanguageProgress(): (
	language: Language,
	action: SetStateAction<LanguageProgress>,
) => void {
	const [_, setWordsState] = useStorageState(storageConfig);

	return (language: Language, action: SetStateAction<LanguageProgress>): void => {
		setWordsState((prev) => {
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
}
