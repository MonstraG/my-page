import { VocabularyTester } from "@/components/words/VocabularyTester";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { promises as fs } from "node:fs";
import type { Metadata, NextPage } from "next";
import { type Language, languages } from "@/components/words/languages.ts";

export async function generateStaticParams(): Promise<{ language: Language }[]> {
	const dirEntries = await fs.readdir("words");
	return dirEntries
		.filter((file) => file.endsWith(".txt"))
		.map((wordFile) => wordFile.replace(".txt", ""))
		.filter((fileName): fileName is Language => languages.some((l) => l.iso === fileName))
		.map((language) => ({ language }));
}

export const metadata: Metadata = {
	title: "Vocabulary tester",
	description: "Find most common word you didn't learn yet",
};

const VocabularyTesterPage: NextPage<{ params: Promise<{ language: Language }> }> = async ({
	params,
}) => {
	const { language } = await params;

	const file = await fs.readFile(`words/${language}.txt`, "utf-8");
	const allWords = file.split("\n");

	return (
		<ArticleContainer>
			<VocabularyTester allWords={allWords} language={language} />
		</ArticleContainer>
	);
};

export default VocabularyTesterPage;
