export interface MeaningDTO {
	partOfSpeech: "adjective" | "noun" | "verb" | "adverb" | "interjection"; // actually has more values but I don't know them
	definitions: readonly DefinitionDTO[];
	synonyms: string;
	antonyms: string;
}

export interface DefinitionDTO {
	definition: string;
	synonyms: string;
	antonyms: string;
}

export interface DictionaryEntryDTO {
	word: string;
	phonetics: readonly string[];
	meanings: readonly MeaningDTO[];
	license: {
		name: string;
		url: string;
	};
	sourceUrls: readonly string[];
}

export interface ErroneousApiResponse {
	title: string;
	message: string;
	resolution: string;
}

export type DictionaryApiResponse = DictionaryEntryDTO[] | ErroneousApiResponse;

export interface Dictionary {
	meanings: null | "not found" | readonly Meaning[];
	index: number;
}

export interface Meaning {
	partOfSpeech: string;
	definition: string;
}
