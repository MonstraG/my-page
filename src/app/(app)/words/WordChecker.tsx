"use client";
import { type FC, useState } from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

interface Props {
	allWords: string[];
}

export const WordChecker: FC<Props> = ({ allWords }) => {
	const [words, setWords] = useState<{
		currentIndex: number;
		known: number[];
		unknown: number[];
		earliestUnknown: number | null;
		lastKnownBeforeUnknown: number | null;
	}>({
		currentIndex: Math.floor(allWords.length / 2),
		known: [],
		unknown: [],
		earliestUnknown: null,
		lastKnownBeforeUnknown: null
	});

	const findNextIndex = (left: number, right: number) => {
		return left + Math.floor((right - left) / 2);
	};

	const handleKnownClick = () => {
		setWords((prev) => {
			const newLastKnown = Math.max(
				prev.lastKnownBeforeUnknown ?? prev.currentIndex,
				prev.currentIndex
			);

			// todo: we need to be smarter in picking next word here, (and in the other method too)
			const nextIndex = findNextIndex(newLastKnown, prev.earliestUnknown ?? allWords.length);

			return {
				...prev,
				currentIndex: nextIndex,
				known: [...prev.known, prev.currentIndex],
				lastKnownBeforeUnknown: newLastKnown
			};
		});
	};

	const handleUnknownClick = () => {
		setWords((prev) => {
			const newEarliestUnknown = Math.min(
				prev.earliestUnknown ?? prev.currentIndex,
				prev.currentIndex
			);
			const newLastKnown = prev.known
				.filter((x) => x < newEarliestUnknown)
				.reduce((acc, next) => Math.max(acc, next), 0);

			const newIndex = findNextIndex(1, newEarliestUnknown);

			return {
				...prev,
				currentIndex: newIndex,
				unknown: [...prev.unknown, prev.currentIndex],
				earliestUnknown: newEarliestUnknown,
				lastKnownBeforeUnknown: newLastKnown
			};
		});
	};

	return (
		<div>
			<Typography level="h1" textAlign="center">
				{allWords[words.currentIndex]}
			</Typography>

			<Stack direction="row" spacing={4} justifyContent="center" my={4}>
				<Button color="success" size="lg" onClick={handleKnownClick}>
					Know
				</Button>
				<Button color="danger" size="lg" onClick={handleUnknownClick}>
					Do not know
				</Button>
			</Stack>

			{words.earliestUnknown && (
				<Typography level="h3">
					Earliest word you do not know is the word #{words.earliestUnknown}:{" "}
					<strong>{allWords[words.earliestUnknown]}</strong>
				</Typography>
			)}

			<pre>{JSON.stringify(words, null, 4)}</pre>
		</div>
	);
};
