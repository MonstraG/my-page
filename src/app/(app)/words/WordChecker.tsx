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
import { server } from "@/app/(app)/words/server";
import { openSnackbar } from "@/components/SnackbarHost";
import { DictionaryEntries, emptyDictionary } from "@/app/(app)/words/DictionaryEntries";
import type { Dictionary, DictionaryEntry } from "@/app/(app)/words/Dictionary.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useHasRendered } from "@/components/useHasRendered";

const definitionUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

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

const randomize = (number: number) => number + Math.floor((Math.random() - 0.5) * 10);

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

	const avoidRepeats = (hitItems: number[], newIndex: number) => {
		while (hitItems.includes(newIndex)) {
			newIndex += 1;
		}

		const maximum = words.earliestUnknown ?? allWords.length;
		while (newIndex > maximum || hitItems.includes(newIndex)) {
			newIndex -= 1;
		}
		return newIndex;
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

			const newKnown = [...prev.known, prev.currentIndex];

			const nextIndex = new Chain(
				oneToFourBetween(newLastKnown, prev.earliestUnknown ?? allWords.length)
			)
				.then((n) => randomize(n))
				.then((n) => Math.min(n, allWords.length))
				.then((n) =>
					avoidRepeats([...newKnown, ...prev.unknown, ...prev.invalid], n)
				).result;

			return {
				...prev,
				currentIndex: nextIndex,
				known: [...prev.known, prev.currentIndex],
				lastKnownBeforeUnknown: newLastKnown
			};
		});
		setDictionary(emptyDictionary);
	};

	const handleUnknownClick = () => {
		useWordsStore.setState((prev) => {
			const newEarliestUnknown = Math.min(
				prev.earliestUnknown ?? prev.currentIndex,
				prev.currentIndex
			);
			const newLastKnown = prev.known
				.filter((x) => x < newEarliestUnknown)
				.reduce((acc, next) => Math.max(acc, next), 0);
			const newUnknown = [...prev.unknown, prev.currentIndex];

			const nextIndex = new Chain(oneToFourBetween(1, newEarliestUnknown))
				.then((n) => randomize(n))
				.then((n) => Math.min(n, allWords.length))
				.then((n) =>
					avoidRepeats([...newUnknown, ...prev.known, ...prev.invalid], n)
				).result;

			return {
				...prev,
				currentIndex: nextIndex,
				unknown: newUnknown,
				earliestUnknown: newEarliestUnknown,
				lastKnownBeforeUnknown: newLastKnown
			};
		});
		setDictionary(emptyDictionary);
	};

	const handleInvalidClick = () => {
		useWordsStore.setState((prev) => {
			void server(allWords[prev.currentIndex]);

			const newInvalid = [...prev.invalid, prev.currentIndex];

			const nextIndex = new Chain(
				oneToFourBetween(
					prev.lastKnownBeforeUnknown ?? 1,
					prev.earliestUnknown ?? allWords.length
				)
			)
				.then((n) => randomize(n))
				.then((n) => Math.min(n, allWords.length))
				.then((n) =>
					avoidRepeats([...prev.known, ...prev.unknown, ...newInvalid], n)
				).result;

			return {
				...prev,
				currentIndex: nextIndex,
				invalid: newInvalid
			};
		});
		setDictionary(emptyDictionary);
	};

	const [dictionary, setDictionary] = useState<Dictionary>(emptyDictionary);
	const [loadingDefinition, setLoadingDefinition] = useState<boolean>(false);

	const handleFetchDefinition = () => {
		setLoadingDefinition(true);
		fetch(`${definitionUrl}${allWords[words.currentIndex]}`, { method: "GET" })
			.then((response) => response.json())
			.then((data: DictionaryEntry[]) => {
				setDictionary({ ...emptyDictionary, entries: data });
			})
			.catch((err) => {
				console.error(err);
				openSnackbar({
					color: "danger",
					variant: "solid",
					children: "Failed to get the definition"
				});
			})
			.finally(() => {
				setLoadingDefinition(false);
			});
	};

	if (!rendered) {
		return null;
	}

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
				<Stack direction="row" spacing={4} justifyContent="center">
					<Tooltip title="If you think this word is misspeled or doesn't exist in english, you can skip it by pressing this">
						<Button color="neutral" variant="soft" onClick={handleInvalidClick}>
							Invalid
						</Button>
					</Tooltip>
					<Button
						color="neutral"
						variant="soft"
						onClick={handleFetchDefinition}
						loading={loadingDefinition}
					>
						Show definition
					</Button>
				</Stack>
			</Stack>

			<DictionaryEntries dictionary={dictionary} setDictionary={setDictionary} />

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
