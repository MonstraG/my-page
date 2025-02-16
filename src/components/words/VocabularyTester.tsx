"use client";
import type { FC } from "react";
import {
	emptyLanguageProgress,
	type Language,
	useWordsStore
} from "@/components/words/useWordsStore";
import { StatCard } from "@/components/words/StatCard";
import { MainControls } from "@/components/words/MainControls";
import { Stack } from "@/ui/Stack/Stack";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";

interface Props {
	allWords: string[];
	language: Language;
}

export const VocabularyTester: FC<Props> = ({ allWords, language }) => {
	const wordState = useWordsStore();
	const progress = wordState.progress[language] ?? emptyLanguageProgress;

	const currentWord = allWords[progress.currentIndex];

	return (
		<Stack gap={2}>
			<h1 style={{ textAlign: "center" }}>{currentWord}</h1>

			<MainControls language={language} allWords={allWords} currentWord={currentWord} />

			{progress.earliestUnknown && (
				<h3>
					Earliest word you do not know is the word #{progress.earliestUnknown}:{" "}
					<strong>{allWords[progress.earliestUnknown]}</strong>
				</h3>
			)}

			<StatCard progress={progress} totalWords={allWords.length} />

			<Paragraph color="gray">
				<small>
					Word lists taken from{" "}
					<MyLink
						href="https://github.com/oprogramador/most-common-words-by-language"
						color="inherit"
					>
						github.com/oprogramador/most-common-words-by-language
					</MyLink>
				</small>
			</Paragraph>
		</Stack>
	);
};
