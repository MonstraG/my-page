import type {
	DictionaryApiResponse,
	DictionaryEntryDTO,
	ErroneousApiResponse,
	Meaning,
} from "@/components/words/DictionaryApi/DictionaryApi.types";

export const parseMeanings = (response: DictionaryEntryDTO[]): Meaning[] =>
	response
		.flatMap((entry) => entry.meanings)
		.flatMap((meaning) =>
			meaning.definitions.map((definition) => ({
				partOfSpeech: meaning.partOfSpeech,
				definition: definition.definition,
			}))
		);

export const isResponseErroneous = (
	response: DictionaryApiResponse,
): response is ErroneousApiResponse => "title" in response;
