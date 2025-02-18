import { useCallback, useState } from "react";
import type {
	Dictionary,
	DictionaryApiResponse
} from "@/components/words/DictionaryApi/DictionaryApi.types";
import { emptyDictionary } from "@/components/words/DictionaryApi/DictionaryApiViewer";
import { openSnackbar } from "@/components/SnackbarHost";
import {
	isResponseErroneous,
	parseMeanings
} from "@/components/words/DictionaryApi/DictionaryApi.helpers";
import type { Language } from "@/components/words/useWordsStore";

const definitionUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const useDictionaryApi = (
	language: Language
): {
	dictionary: Dictionary;
	loadingDefinitions: boolean;
	fetchDefinition: (word: string) => void;
	clearDictionary: () => void;
	toPreviousMeaning: () => void;
	toNextMeaning: () => void;
	apiAvailable: boolean;
} => {
	const [dictionary, setDictionary] = useState<Dictionary>(emptyDictionary);
	const [loadingDefinitions, setLoadingDefinitions] = useState<boolean>(false);

	const fetchDefinition = useCallback((word: string) => {
		setLoadingDefinitions(true);
		fetch(`${definitionUrl}${word}`, { method: "GET" })
			.then((response) => response.json())
			.then((data: DictionaryApiResponse) => {
				if (isResponseErroneous(data)) {
					setDictionary({ ...emptyDictionary, meanings: "not found" });
					return;
				}

				setDictionary({ ...emptyDictionary, meanings: parseMeanings(data) });
			})
			.catch((err: unknown) => {
				console.error(err);
				openSnackbar({
					color: "danger",
					variant: "solid",
					children: "Failed to get the definition"
				});
			})
			.finally(() => {
				setLoadingDefinitions(false);
			});
	}, []);

	const clearDictionary = useCallback(() => {
		setDictionary(emptyDictionary);
	}, []);

	const toPreviousMeaning = useCallback(() => {
		setDictionary((prev) => ({
			...prev,
			index: prev.index - 1
		}));
	}, []);

	const toNextMeaning = useCallback(() => {
		setDictionary((prev) => ({
			...prev,
			index: prev.index + 1
		}));
	}, []);

	return {
		dictionary,
		loadingDefinitions,
		fetchDefinition,
		clearDictionary,
		toPreviousMeaning,
		toNextMeaning,
		apiAvailable: language === "en"
	};
};
