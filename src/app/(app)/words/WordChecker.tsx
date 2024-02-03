"use client";
import { type FC, useState } from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import { Chain } from "@/app/(app)/words/Chain";
import Tooltip from "@mui/joy/Tooltip";
import { reportInvalid } from "@/app/(app)/words/reportInvalid";
import { DictionaryApiViewer } from "@/app/(app)/words/DictionaryApi/DictionaryApiViewer";
import { useHasRendered } from "@/components/useHasRendered";
import { useDictionaryApi } from "@/app/(app)/words/DictionaryApi/useDictionaryApi";
import { styled } from "@mui/joy/styles";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Link from "@mui/joy/Link";
import useSWRImmutable from "swr/immutable";
import { openSnackbar } from "@/components/SnackbarHost";
import CircularProgress from "@mui/joy/CircularProgress";
import Autocomplete from "@mui/joy/Autocomplete";
import LanguageIcon from "@mui/icons-material/Language";
import Skeleton from "@mui/joy/Skeleton";
import {
	emptyLanguageProgress,
	type LanguageProgress,
	languages,
	setProgress,
	useWordsStore
} from "@/app/(app)/words/useWordsStore";
import { StatCard } from "@/app/(app)/words/StatCard";

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
		keepPreviousData: true,
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
	if (!rendered || allWords == null) {
		return (
			<Stack justifyContent="center" alignItems="center" minHeight="200px">
				<CircularProgress />
			</Stack>
		);
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
				<Skeleton loading={words.isLoading}>{allWords[progress.currentIndex]}</Skeleton>
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
						<Autocomplete
							options={languages}
							startDecorator={<LanguageIcon />}
							value={languages.find((l) => l.iso === language)}
							onChange={(_, newValue) => {
								if (newValue) {
									useWordsStore.setState((prev) => ({
										...prev,
										language: newValue.iso
									}));
								}
							}}
						/>
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
