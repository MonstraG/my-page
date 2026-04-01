import { VocabularyTester } from "@/components/words/VocabularyTester";
import { promises as fs } from "node:fs";
import type { Metadata, NextPage } from "next";
import { type Language, languages } from "@/components/words/languages.ts";
import { allPages, getMetadata } from "@/components/nav/pages";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";

export async function generateStaticParams(): Promise<{ language: Language }[]> {
	const dirEntries = await fs.readdir("words");
	return dirEntries
		.filter((file) => file.endsWith(".txt"))
		.map((wordFile) => wordFile.replace(".txt", ""))
		.filter((fileName): fileName is Language => languages.some((l) => l.iso === fileName))
		.map((language) => ({ language }));
}

export const metadata: Metadata = getMetadata(allPages.vocabularyTester);

const VocabularyTesterPage: NextPage<{ params: Promise<{ language: Language }> }> = async ({
	params,
}) => {
	const { language } = await params;

	const file = await fs.readFile(`words/${language}.txt`, "utf-8");
	const allWords = file.split("\n");

	return (
		<MainLayout path={allPages.vocabularyTester.title}>
			<VocabularyTester allWords={allWords} language={language} />
		</MainLayout>
	);
};

export default VocabularyTesterPage;
