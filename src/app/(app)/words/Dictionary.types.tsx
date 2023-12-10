export interface Meaning {
	partOfSpeech: "adjective" | "noun" | "verb"; // actually has more values but I don't know them
	definitions: Definition[];
	synonyms: string;
	antonyms: string;
}

export interface Definition {
	definition: string;
	synonyms: string;
	antonyms: string;
}

export interface DictionaryEntry {
	word: string;
	phonetics: string[];
	meanings: Meaning[];
	license: {
		name: string;
		url: string;
	};
	sourceUrls: string[];
}

export interface Dictionary {
	entries: DictionaryEntry[] | null | { title: string; message: string; resolution: string };
	entryIndex: number;
	definitionIndex: number;
}
