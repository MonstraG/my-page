"use client";
import { type FC, useEffect, useState } from "react";
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
import { devtools, persist } from "zustand/middleware";
import { useHasRendered } from "@/components/useHasRendered";
import { useDictionaryApi } from "@/app/(app)/words/DictionaryApi/useDictionaryApi";
import { styled } from "@mui/joy/styles";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";

const Toolbar = styled("div")`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: ${({ theme }) => theme.spacing(4)};
	grid-column: 2;
	align-items: center;
`;

type NavigationMode = "UnknownAware" | "Random";

interface CheckerState {
	currentIndex: number;
	known: number[];
	unknown: number[];
	invalid: number[];
	earliestUnknown: number | null;
	lastKnownBeforeUnknown: number | null;
	initialized: boolean;
}

export const useWordsStore = create<CheckerState>()(
	devtools(
		persist(
			() =>
				({
					currentIndex: 0,
					known: [],
					unknown: [],
					invalid: [],
					earliestUnknown: null,
					lastKnownBeforeUnknown: null,
					initialized: false
				}) as CheckerState,
			{
				name: "words"
			}
		)
	)
);

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

interface Props {
	allWords: string[];
}

export const WordChecker: FC<Props> = ({ allWords }) => {
	const words = useWordsStore();
	const rendered = useHasRendered();

	useEffect(() => {
		if (typeof window === "undefined" || words.initialized) {
			return;
		}

		useWordsStore.setState({
			currentIndex: Math.floor(allWords.length / 2),
			known: [],
			unknown: [],
			invalid: [],
			earliestUnknown: null,
			lastKnownBeforeUnknown: null,
			initialized: true
		});
	}, [allWords.length, words.initialized]);

	const {
		dictionary,
		loadingDefinitions,
		fetchDefinition,
		clearDictionary,
		toPreviousMeaning,
		toNextMeaning
	} = useDictionaryApi();

	const [navigationMode, setNavigationMode] = useState<NavigationMode>("UnknownAware");

	if (!rendered) {
		return null;
	}

	const findNextIndex = (state: CheckerState, justClicked: "known" | "unknown" | "invalid") => {
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
		useWordsStore.setState((prev) => {
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
		useWordsStore.setState((prev) => {
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
		useWordsStore.setState((prev) => {
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
				{allWords[words.currentIndex]}
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
					<Stack
						direction="row"
						spacing={4}
						justifyContent="center"
						sx={{ gridColumn: 2 }}
					>
						<Tooltip title="If you think this word is misspeled or doesn't exist in english, you can skip it by pressing this">
							<Button color="neutral" variant="soft" onClick={handleInvalidClick}>
								Invalid
							</Button>
						</Tooltip>
						<Button
							color="neutral"
							variant="soft"
							onClick={() => {
								fetchDefinition(allWords[words.currentIndex]);
							}}
							loading={loadingDefinitions}
						>
							Show definition
						</Button>
					</Stack>

					<Box
						sx={{
							gridColumn: 3,
							display: "flex",
							justifyContent: "flex-end"
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

			{words.earliestUnknown && (
				<Typography level="h3">
					Earliest word you do not know is the word #{words.earliestUnknown}:{" "}
					<strong>{allWords[words.earliestUnknown]}</strong>
				</Typography>
			)}

			<Card orientation="horizontal" variant="outlined" sx={{ gap: 0 }}>
				<Box flexShrink={0} flexBasis="210px">
					<AnswerStats known={words.known.length} unknown={words.unknown.length} />
				</Box>

				<Divider />

				<CardOverflow sx={{ width: "100%", py: 0 }}>
					<AccordionGroup>
						<Accordion>
							<AccordionSummary>Answer map</AccordionSummary>
							<AccordionDetails>
								<AnswerMap
									totalWords={allWords.length}
									known={words.known}
									unknown={words.unknown}
									invalid={words.invalid}
								/>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary>Debug state</AccordionSummary>
							<AccordionDetails>
								<pre>{JSON.stringify(words, null, 4)}</pre>
							</AccordionDetails>
						</Accordion>
					</AccordionGroup>
				</CardOverflow>
			</Card>
		</Stack>
	);
};
