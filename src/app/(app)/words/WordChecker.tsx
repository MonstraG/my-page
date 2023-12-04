"use client";
import { type FC, useState } from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

const oneToFourBetween = (left: number, right: number) => left + Math.floor((right - left) / 4);

const randomize = (number: number) => number + Math.floor((Math.random() - 0.5) * 10);

class Chain<T> {
	public result: T;

	constructor(initValue: T) {
		this.result = initValue;
	}

	then<U>(func: (value: T) => U): Chain<U> {
		return new Chain<U>(func(this.result));
	}
}

interface CheckerState {
	currentIndex: number;
	known: number[];
	unknown: number[];
	earliestUnknown: number | null;
	lastKnownBeforeUnknown: number | null;
}

interface Props {
	allWords: string[];
}

export const WordChecker: FC<Props> = ({ allWords }) => {
	const [words, setWords] = useState<CheckerState>({
		currentIndex: Math.floor(allWords.length / 2),
		known: [],
		unknown: [],
		earliestUnknown: null,
		lastKnownBeforeUnknown: null
	});

	const avoidRepeats = (hitItems: number[], newIndex: number) => {
		while (hitItems.includes(newIndex)) {
			newIndex += 1;
		}
		while (newIndex > allWords.length || hitItems.includes(newIndex)) {
			newIndex -= 1;
		}
		return newIndex;
	};

	const handleKnownClick = () => {
		setWords((prev) => {
			const newLastKnown = prev.currentIndex;
			const newKnown = [...prev.known, prev.currentIndex];

			const nextIndex = new Chain(
				oneToFourBetween(newLastKnown, prev.earliestUnknown ?? allWords.length)
			)
				.then((n) => randomize(n))
				.then((n) => Math.min(n, allWords.length))
				.then((n) => avoidRepeats([...newKnown, ...prev.unknown], n)).result;

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
			const newUnknown = [...prev.unknown, prev.currentIndex];

			const nextIndex = new Chain(oneToFourBetween(1, newEarliestUnknown))
				.then((n) => randomize(n))
				.then((n) => Math.min(n, allWords.length))
				.then((n) => avoidRepeats([...newUnknown, ...prev.known], n)).result;

			return {
				...prev,
				currentIndex: nextIndex,
				unknown: newUnknown,
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
