"use client";
import type { FC } from "react";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Link from "@mui/joy/Link";
import {
	emptyLanguageProgress,
	type Language,
	useWordsStore
} from "@/components/words/useWordsStore";
import { StatCard } from "@/components/words/StatCard";
import { MainControls } from "@/components/words/MainControls";

interface Props {
	allWords: string[];
	language: Language;
}

export const VocabularyTester: FC<Props> = ({ allWords, language }) => {
	const wordState = useWordsStore();
	const progress = wordState.progress[language] ?? emptyLanguageProgress;

	const currentWord = allWords[progress.currentIndex];

	return (
		<Stack spacing={4}>
			<Typography level="h1" textAlign="center">
				{currentWord}
			</Typography>

			<MainControls language={language} allWords={allWords} currentWord={currentWord} />

			{progress.earliestUnknown && (
				<Typography level="h3">
					Earliest word you do not know is the word #{progress.earliestUnknown}:{" "}
					<strong>{allWords[progress.earliestUnknown]}</strong>
				</Typography>
			)}

			<StatCard progress={progress} totalWords={allWords.length} />

			<Typography level="body-sm">
				Word lists taken from{" "}
				<Link
					href="https://github.com/oprogramador/most-common-words-by-language"
					color="neutral"
				>
					github.com/oprogramador/most-common-words-by-language
				</Link>
			</Typography>
		</Stack>
	);
};
