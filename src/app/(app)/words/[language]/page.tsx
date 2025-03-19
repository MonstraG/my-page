import { type Language, languages } from "@/components/words/useWordsStore";
import { VocabularyTester } from "@/components/words/VocabularyTester";
import { Container } from "@/ui/Container/Container";
import { promises as fs } from "fs";
import type { Metadata, NextPage } from "next";

export async function generateStaticParams(): Promise<{ language: Language }[]> {
	const dirEntries = await fs.readdir("words");
	return dirEntries
		.filter((file) => file.endsWith(".txt"))
		.map((wordFile) => wordFile.replace(".txt", ""))
		.filter((fileName): fileName is Language => languages.some((l) => l.iso === fileName))
		.map((language) => ({ language }));
}

export const metadata: Metadata = {
	title: "Vocabulary Tester",
};

const VocabularyTesterPage: NextPage<{ params: Promise<{ language: Language }> }> = async ({
	params,
}) => {
	const { language } = await params;

	const file = await fs.readFile(`words/${language}.txt`, "utf-8");
	const allWords = file.split("\n");

	return (
		<Container>
			<VocabularyTester allWords={allWords} language={language} />
		</Container>
	);
};

export default VocabularyTesterPage;
