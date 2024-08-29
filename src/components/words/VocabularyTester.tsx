"use client";
import type { FC } from "react";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useHasRendered } from "@/components/useHasRendered";
import Link from "@mui/joy/Link";
import useSWRImmutable from "swr/immutable";
import { openSnackbar } from "@/components/SnackbarHost";
import CircularProgress from "@mui/joy/CircularProgress";
import Skeleton from "@mui/joy/Skeleton";
import { emptyLanguageProgress, useWordsStore } from "@/components/words/useWordsStore";
import { StatCard } from "@/components/words/StatCard";
import { MainControls } from "@/components/words/MainControls";

const wordsFetcher = (url: string) => fetch(url).then((response) => response.json());

export const VocabularyTester: FC = () => {
	const wordState = useWordsStore();
	const rendered = useHasRendered();
	const language = wordState.language;
	const progress = wordState.progress[language] ?? emptyLanguageProgress;

	const words = useSWRImmutable<string[]>(`/api/words/${language}`, {
		fetcher: wordsFetcher,
		keepPreviousData: true,
		onError: (err) => {
			console.error(err);
			openSnackbar({ color: "danger", variant: "solid", children: "Failed to fetch words" });
		}
	});

	const allWords = words.data;
	if (!rendered || allWords == null) {
		return (
			<Stack justifyContent="center" alignItems="center" minHeight="200px">
				<CircularProgress />
			</Stack>
		);
	}

	const currentWord = allWords[progress.currentIndex];

	return (
		<Stack spacing={4}>
			<Typography level="h1" textAlign="center">
				<Skeleton loading={words.isLoading}>{currentWord}</Skeleton>
			</Typography>

			<MainControls language={language} allWords={allWords} currentWord={currentWord} />

			{progress.earliestUnknown && (
				<Typography level="h3">
					<Skeleton loading={words.isLoading}>
						Earliest word you do not know is the word #{progress.earliestUnknown}:{" "}
						<strong>{allWords[progress.earliestUnknown]}</strong>
					</Skeleton>
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
