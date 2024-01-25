"use client";
import { type FC, type SetStateAction, useState } from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { AnswerMap } from "@/app/(app)/words/AnswerMap";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import { Chain } from "@/app/(app)/words/Chain";
import { AnswerStats } from "@/app/(app)/words/AnswerStats";
import Tooltip from "@mui/joy/Tooltip";
import { reportInvalid } from "@/app/(app)/words/reportInvalid";
import { DictionaryApiViewer } from "@/app/(app)/words/DictionaryApi/DictionaryApiViewer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useHasRendered } from "@/components/useHasRendered";
import { useDictionaryApi } from "@/app/(app)/words/DictionaryApi/useDictionaryApi";
import { styled } from "@mui/joy/styles";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Link from "@mui/joy/Link";
import useSWRImmutable from "swr/immutable";
import { openSnackbar } from "@/components/SnackbarHost";
import CircularProgress from "@mui/joy/CircularProgress";

export type Language = "en" | "no" | "ru";

const Toolbar = styled("div")`
	display: grid;
	${({ theme }) => theme.breakpoints.down("sm")} {
		gap: ${({ theme }) => theme.spacing(2)};
		grid-template-rows: repeat(3, 1fr);
	}
	${({ theme }) => theme.breakpoints.up("sm")} {
		gap: ${({ theme }) => theme.spacing(4)};
		grid-template-columns: repeat(3, 1fr);
	}
`;

type NavigationMode = "UnknownAware" | "Random";

interface WordState {
	language: Language;
	progress: Partial<Record<Language, LanguageProgress>>;
}

interface LanguageProgress {
	currentIndex: number;
	known: number[];
	unknown: number[];
	invalid: number[];
	earliestUnknown: number | null;
	lastKnownBeforeUnknown: number | null;
}

const emptyWordsStore: WordState = {
	language: "en",
	progress: {}
};

const emptyLanguageProgress: LanguageProgress = {
	currentIndex: 5000,
	known: [],
	unknown: [],
	invalid: [],
	earliestUnknown: null,
	lastKnownBeforeUnknown: null
};

export const useWordsStore = create<WordState>()(
	persist(() => emptyWordsStore, {
		name: "words",
		version: 1,
		migrate: () => emptyWordsStore
	})
);

const setProgress = (action: SetStateAction<LanguageProgress>) => {
	useWordsStore.setState((prev) => {
		const prevProgress = prev.progress[prev.language];

		let newProgress: LanguageProgress | undefined;
		if (typeof action === "function") {
			newProgress = action(prevProgress ?? emptyLanguageProgress);
		} else {
			newProgress = action;
		}

		return {
			...prev,
			progress: {
				...prev.progress,
				[prev.language]: newProgress
			}
		};
	});
};

const oneToFourBetween = (left: number, right: number) => left + Math.floor((right - left) / 4);

const randomInt = (from: number, to: number) => Math.floor(Math.random() * to - from + 1) + from;

/**
 * tries to check `newIndex` against `visitedItems`, whilst trying to reach the `goal`,
 * and staying within `absoluteMin` and `absoluteMax`.
 * Diagram of the search order
 * ```js
 * [, absoluteMin, , newIndex, , , , goal, , , absoluteMax, ]
 *         |			------(1)----->				|
 *         <------------------(2)-----  			|
 *         							  ------(3)---->
 * ```
 */
const findUnvisited = (
	visitedItems: number[],
	newIndex: number,
	goal: number,
	absoluteMin: number,
	absoluteMax: number
) => {
	// go up to goal (1)
	while (visitedItems.includes(newIndex)) {
		newIndex += 1;
	}

	// if overshot goal, go down (2)
	while (newIndex > goal || visitedItems.includes(newIndex)) {
		newIndex -= 1;
	}

	// if undershot the minimum, it seems like the only available space is after the goal, so go there again (3).
	if (newIndex <= absoluteMin) {
		newIndex = goal;

		while (visitedItems.includes(newIndex) && newIndex < absoluteMax) {
			newIndex += 1;
		}
	}

	return newIndex;
};

const wordsFetcher = (url: string) => fetch(url).then((response) => response.json());

export const WordChecker: FC = () => {
	const wordState = useWordsStore();
	const rendered = useHasRendered();
	const language = wordState.language;
	const progress = wordState.progress[language] ?? emptyLanguageProgress;

	const words = useSWRImmutable<string[]>(`/api/words/${language}`, {
		fetcher: wordsFetcher,
		onError: (err) => {
			console.error(err);
			openSnackbar({ color: "danger", variant: "solid", children: "Failed to fetch words" });
		}
	});

	const {
		dictionary,
		loadingDefinitions,
		fetchDefinition,
		clearDictionary,
		toPreviousMeaning,
		toNextMeaning,
		apiAvailable
	} = useDictionaryApi(language);

	const [navigationMode, setNavigationMode] = useState<NavigationMode>("UnknownAware");

	const allWords = words.data;
	if (!rendered || words.isLoading || allWords == null) {
		return <CircularProgress />;
	}

	const findNextIndex = (
		state: LanguageProgress,
		justClicked: "known" | "unknown" | "invalid"
	) => {
		switch (navigationMode) {
			case "UnknownAware": {
				const left = justClicked === "known" ? state.lastKnownBeforeUnknown ?? 0 : 0;
				return new Chain(oneToFourBetween(left, state.earliestUnknown ?? allWords.length))
					.then((n) => n + randomInt(-5, 5))
					.then((n) => Math.min(n, allWords.length))
					.then((n: number) =>
						findUnvisited(
							[...state.known, ...state.unknown, ...state.invalid],
							n,
							state.earliestUnknown ?? allWords.length,
							0,
							allWords.length
						)
					).result;
			}
			case "Random": {
				return new Chain(randomInt(0, allWords.length)).then((n) =>
					findUnvisited(
						[...state.known, ...state.unknown, ...state.invalid],
						n,
						allWords.length,
						0,
						allWords.length
					)
				).result;
			}
		}
	};

	const handleKnownClick = () => {
		setProgress((prev) => {
			let newLastKnown = prev.currentIndex;
			const veryCloseToUnknown =
				prev.earliestUnknown != null && Math.abs(newLastKnown - prev.earliestUnknown) < 10;
			if (veryCloseToUnknown) {
				// we are very close, reset back to more or less start
				newLastKnown = Math.floor(Math.random() * 10);
			}

			const newState = {
				...prev,
				known: [...prev.known, prev.currentIndex],
				lastKnownBeforeUnknown: newLastKnown
			};
			newState.currentIndex = findNextIndex(newState, "known");
			return newState;
		});
		clearDictionary();
	};

	const handleUnknownClick = () => {
		setProgress((prev) => {
			const newEarliestUnknown = Math.min(
				prev.earliestUnknown ?? prev.currentIndex,
				prev.currentIndex
			);

			const newState = {
				...prev,
				unknown: [...prev.unknown, prev.currentIndex],
				earliestUnknown: newEarliestUnknown,
				lastKnownBeforeUnknown: prev.known
					.filter((x) => x < newEarliestUnknown)
					.reduce((acc, next) => Math.max(acc, next), 0)
			};
			newState.currentIndex = findNextIndex(newState, "unknown");
			return newState;
		});
		clearDictionary();
	};

	const handleInvalidClick = () => {
		setProgress((prev) => {
			void reportInvalid(allWords[prev.currentIndex]);

			const newState = {
				...prev,
				invalid: [...prev.invalid, prev.currentIndex]
			};
			newState.currentIndex = findNextIndex(newState, "invalid");
			return newState;
		});
		clearDictionary();
	};

	return (
		<Stack spacing={4}>
			<Typography level="h1" textAlign="center">
				{allWords[progress.currentIndex]}
			</Typography>

			<Stack spacing={4}>
				<Stack direction="row" spacing={4} justifyContent="center">
					<Button color="success" size="lg" onClick={handleKnownClick}>
						Know
					</Button>
					<Button color="danger" size="lg" onClick={handleUnknownClick}>
						Do not know
					</Button>
				</Stack>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							justifyContent: { xs: "center", sm: "flex-start" }
						}}
					>
						<ToggleButtonGroup
							value={language}
							onChange={(_, newValue) => {
								if (newValue) {
									useWordsStore.setState((prev) => ({
										...prev,
										language: newValue
									}));
								}
							}}
						>
							<Button color="neutral" value="en">
								English
							</Button>
							<Button color="neutral" value="no">
								Norsk
							</Button>
							<Button color="neutral" value="ru">
								Русский
							</Button>
						</ToggleButtonGroup>
					</Box>

					<Stack direction="row" spacing={4} justifyContent="center">
						<Tooltip title="If you think this word is misspeled or doesn't exist in english, you can skip it by pressing this">
							<Button color="neutral" variant="soft" onClick={handleInvalidClick}>
								Invalid
							</Button>
						</Tooltip>
						<Tooltip
							title={
								!apiAvailable
									? "Dictionary definitions are not available for this language"
									: ""
							}
						>
							<span>
								<Button
									color="neutral"
									variant="soft"
									disabled={!apiAvailable}
									onClick={() => {
										fetchDefinition(allWords[progress.currentIndex]);
									}}
									loading={loadingDefinitions}
								>
									Show definition
								</Button>
							</span>
						</Tooltip>
					</Stack>

					<Box
						sx={{
							display: "flex",
							justifyContent: { xs: "center", sm: "flex-end" }
						}}
					>
						<ToggleButtonGroup
							value={navigationMode}
							onChange={(_, newValue) => {
								if (newValue) {
									setNavigationMode(newValue);
								}
							}}
						>
							<Button color="neutral" value="UnknownAware">
								Try to find first unknown
							</Button>
							<Button color="neutral" value="Random">
								Show random
							</Button>
						</ToggleButtonGroup>
					</Box>
				</Toolbar>
			</Stack>

			<DictionaryApiViewer
				dictionary={dictionary}
				toPreviousMeaning={toPreviousMeaning}
				toNextMeaning={toNextMeaning}
			/>

			{progress.earliestUnknown && (
				<Typography level="h3">
					Earliest word you do not know is the word #{progress.earliestUnknown}:{" "}
					<strong>{allWords[progress.earliestUnknown]}</strong>
				</Typography>
			)}

			<Card orientation="horizontal" variant="outlined" sx={{ gap: 0 }}>
				<Box flexShrink={0} flexBasis="210px">
					<AnswerStats known={progress.known.length} unknown={progress.unknown.length} />
				</Box>

				<Divider />

				<CardOverflow sx={{ width: "100%", py: 0 }}>
					<AccordionGroup>
						<Accordion>
							<AccordionSummary>Answer map</AccordionSummary>
							<AccordionDetails>
								<AnswerMap
									totalWords={allWords.length}
									known={progress.known}
									unknown={progress.unknown}
									invalid={progress.invalid}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary>Debug state</AccordionSummary>
							<AccordionDetails>
								<pre>{JSON.stringify(wordState, null, 4)}</pre>
							</AccordionDetails>
						</Accordion>
					</AccordionGroup>
				</CardOverflow>
			</Card>

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
