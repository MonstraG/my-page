import { type FC, useState } from "react";
import { Button } from "@/ui/Button/Button";
import {
	type Language,
	type LanguageProgress,
	languages,
	setProgress
} from "@/components/words/useWordsStore";
import { Stack } from "@/ui/Stack/Stack";
import LanguageIcon from "@mui/icons-material/Language";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import { reportInvalid } from "@/components/words/reportInvalid";
import { DictionaryApiViewer } from "@/components/words/DictionaryApi/DictionaryApiViewer";
import { useDictionaryApi } from "@/components/words/DictionaryApi/useDictionaryApi";
import { Chain } from "@/components/words/Chain";
import Link from "next/link";
import { RadioGroup } from "@/ui/RadioGroup/RadioGroup";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Divider } from "@/ui/Divider/Divider";
import { Select } from "@/ui/Select/Select";

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

const navigationModeOptions = [
	{
		value: "UnknownAware",
		name: "Search for first unknown"
	},
	{
		value: "Random",
		name: "Random"
	}
] as const;
type NavigationMode = (typeof navigationModeOptions)[number]["value"];

interface Props {
	language: Language;
	allWords: string[];
	currentWord: string;
}

export const MainControls: FC<Props> = ({ language, allWords, currentWord }) => {
	const [navigationMode, setNavigationMode] = useState<NavigationMode>("UnknownAware");

	const {
		dictionary,
		loadingDefinitions,
		fetchDefinition,
		clearDictionary,
		toPreviousMeaning,
		toNextMeaning,
		apiAvailable
	} = useDictionaryApi(language);

	const findNextIndex = (
		state: LanguageProgress,
		justClicked: "known" | "unknown" | "invalid"
	) => {
		switch (navigationMode) {
			case "UnknownAware": {
				const left = justClicked === "known" ? (state.lastKnownBeforeUnknown ?? 0) : 0;
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
		setProgress(language, (prev) => {
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
		setProgress(language, (prev) => {
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
		setProgress(language, (prev) => {
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
		<>
			<Stack direction="row" gap={4} style={{ alignSelf: "center" }}>
				<Button color="success" onClick={handleKnownClick} style={{ flex: "1 0 0" }}>
					Know
				</Button>
				<Button color="error" onClick={handleUnknownClick} style={{ flex: "1 0 0" }}>
					Do not know
				</Button>
				<Tooltip title="If you think this word is misspeled or doesn't exist, you can skip it by pressing this">
					<Button color="neutral" onClick={handleInvalidClick} style={{ flex: "1 0 0" }}>
						Invalid
					</Button>
				</Tooltip>
			</Stack>

			<Stack direction="row" gap={2}>
				<Stack gap={1}>
					<Tooltip
						disabled={apiAvailable}
						title="Dictionary definitions are not available for this language"
					>
						<Button
							disabled={!apiAvailable}
							onClick={() => {
								fetchDefinition(currentWord);
							}}
							loading={loadingDefinitions}
							style={{ alignSelf: "end" }}
						>
							Show definition
						</Button>
					</Tooltip>

					<Divider />

					<Select
						startDecorator={<LanguageIcon />}
						value={language}
						sx={{ justifySelf: "center", minWidth: 250 }}
					>
						{languages.map((language) => (
							<Link
								key={language.iso}
								href={`/words/${language.iso}`}
								legacyBehavior
								passHref
							>
								<Option component="a" value={language.iso}>
									{language.label}
								</Option>
							</Link>
						))}
					</Select>

					<RadioGroup
						label="Traversal mode"
						options={navigationModeOptions}
						selected={navigationMode}
						setSelected={setNavigationMode}
					/>
				</Stack>

				<Sheet style={{ padding: 0, flexGrow: 1 }}>
					<DictionaryApiViewer
						dictionary={dictionary}
						toPreviousMeaning={toPreviousMeaning}
						toNextMeaning={toNextMeaning}
					/>
				</Sheet>
			</Stack>
		</>
	);
};
