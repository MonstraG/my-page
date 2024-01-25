import { useCallback, useState } from "react";
import type {
	Dictionary,
	DictionaryApiResponse
} from "@/app/(app)/words/DictionaryApi/DictionaryApi.types";
import { emptyDictionary } from "@/app/(app)/words/DictionaryApi/DictionaryApiViewer";
import { openSnackbar } from "@/components/SnackbarHost";
import {
	isResponseErroneous,
	parseMeanings
} from "@/app/(app)/words/DictionaryApi/DictionaryApi.helpers";
import type { Language } from "@/app/(app)/words/WordChecker";

const definitionUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const useDictionaryApi = (language: Language) => {
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
			.catch((err) => {
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
