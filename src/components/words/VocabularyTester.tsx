"use client";
import { MainControls } from "@/components/words/MainControls";
import { StatCard } from "@/components/words/StatCard";
import { type Language, useWordsStoreForLanguage } from "@/components/words/useWordsStore";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

interface Props {
	allWords: string[];
	language: Language;
}

export const VocabularyTester: FC<Props> = ({ allWords, language }) => {
	const progress = useWordsStoreForLanguage(language);

	const currentWord = allWords[progress.currentIndex];

	return (
		<Stack gap={2}>
			<h1 style={{ textAlign: "center" }}>{currentWord}</h1>

			<MainControls language={language} allWords={allWords} currentWord={currentWord} />

			{progress.earliestUnknown
				? (
					<h3>
						Earliest word you do not know is the word #{progress.earliestUnknown}:{" "}
						<strong>{allWords[progress.earliestUnknown]}</strong>
					</h3>
				)
				: <h3>No words marked as unknown</h3>}

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
