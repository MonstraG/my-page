export interface MeaningDTO {
	partOfSpeech: "adjective" | "noun" | "verb" | "adverb" | "interjection"; // actually has more values but I don't know them
	definitions: DefinitionDTO[];
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
	phonetics: string[];
	meanings: MeaningDTO[];
	license: {
		name: string;
		url: string;
	};
	sourceUrls: string[];
}

export type ErroneousApiResponse = { title: string; message: string; resolution: string };

export type DictionaryApiResponse = DictionaryEntryDTO[] | ErroneousApiResponse;

export interface Dictionary {
	meanings: null | "not found" | Meaning[];
	index: number;
}

export interface Meaning {
	partOfSpeech: string;
	definition: string;
}
