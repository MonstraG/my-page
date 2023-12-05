"use client";
import { type FC, useState } from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListItemContent from "@mui/joy/ListItemContent";
import CancelIcon from "@mui/icons-material/Cancel";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import { AnswerMap } from "@/app/(app)/words/AnswerMap";

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
	invalid: number[];
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
		invalid: [],
		earliestUnknown: null,
		lastKnownBeforeUnknown: null
	});

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
		setWords((prev) => {
			const newLastKnown = prev.currentIndex;
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
	};

	const handleInvalidClick = () => {
		setWords((prev) => {
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
				<Button color="neutral" size="lg" onClick={handleInvalidClick}>
					Invalid
				</Button>
			</Stack>

			{words.earliestUnknown && (
				<Typography level="h3" gutterBottom>
					Earliest word you do not know is the word #{words.earliestUnknown}:{" "}
					<strong>{allWords[words.earliestUnknown]}</strong>
				</Typography>
			)}

			<div>
				<Typography level="h4">Stats:</Typography>

				<List>
					<ListItem>
						<ListItemDecorator>
							<CheckCircleIcon />
						</ListItemDecorator>
						<ListItemContent>Known: {words.known.length}</ListItemContent>
					</ListItem>
					<ListItem>
						<ListItemDecorator>
							<CancelIcon />
						</ListItemDecorator>
						<ListItemContent>Unknown: {words.unknown.length}</ListItemContent>
					</ListItem>
					<ListItem>
						<ListItemDecorator>
							<GolfCourseIcon />
						</ListItemDecorator>
						<ListItemContent>
							Percentage:{" "}
							{
								new Chain(Math.max(words.unknown.length + words.known.length, 1))
									.then((totalAnswered) => words.known.length / totalAnswered)
									.then((ratio) => ratio * 100)
									.then((percentage) => percentage.toFixed(2)).result
							}
							%
						</ListItemContent>
					</ListItem>
				</List>
			</div>

			<AccordionGroup sx={{ mt: 8 }}>
				<Accordion>
					<AccordionSummary>Debug state</AccordionSummary>
					<AccordionDetails>
						<pre>{JSON.stringify(words, null, 4)}</pre>
					</AccordionDetails>
				</Accordion>
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
			</AccordionGroup>
		</div>
	);
};
