import { Chain } from "@/components/words/Chain";
import { DictionaryApiViewer } from "@/components/words/DictionaryApi/DictionaryApiViewer";
import { useDictionaryApi } from "@/components/words/DictionaryApi/useDictionaryApi";
import { type LanguageProgress, useSetLanguageProgress } from "@/components/words/wordsState.tsx";
import { LanguageIcon } from "@/icons/material/LanguageIcon";
import { Button } from "@/ui/Button/Button";
import { CheckboxGroup } from "@/ui/CheckboxGroup/CheckboxGroup";
import { Divider } from "@/ui/Divider/Divider";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import { Select } from "@/ui/Select/Select";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import { type FC, useState } from "react";
import type { Route } from "next";
import { type Language, languages } from "@/components/words/languages.ts";

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
	visitedItems: readonly number[],
	currentIndex: number,
	goal: number,
	absoluteMin: number,
	absoluteMax: number,
) => {
	let newIndex = currentIndex;

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
		name: "Search for first unknown",
	},
	{
		value: "Random",
		name: "Random",
	},
] as const;
type NavigationMode = (typeof navigationModeOptions)[number]["value"];

interface Props {
	language: Language;
	allWords: readonly string[];
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
		apiAvailable,
	} = useDictionaryApi(language);

	const findNextIndex = (
		state: LanguageProgress,
		justClicked: "known" | "unknown" | "invalid",
	) => {
		switch (navigationMode) {
			case "UnknownAware": {
				const left = justClicked === "known" ? (state.lastKnownBeforeUnknown ?? 0) : 0;
				return new Chain(oneToFourBetween(left, state.earliestUnknown ?? allWords.length))
					.then((n) => n + randomInt(-5, 5))
					.then((n) => Math.min(n, allWords.length))
					.then((n) =>
						findUnvisited(
							state.known.concat(state.unknown, state.invalid),
							n,
							state.earliestUnknown ?? allWords.length,
							0,
							allWords.length,
						),
					).result;
			}
			case "Random": {
				return new Chain(randomInt(0, allWords.length)).then((n) =>
					findUnvisited(
						state.known.concat(state.unknown, state.invalid),
						n,
						allWords.length,
						0,
						allWords.length,
					),
				).result;
			}
		}
	};

	const setLanguageProgress = useSetLanguageProgress();

	const handleKnownClick = () => {
		setLanguageProgress(language, (prev) => {
			let newLastKnown = prev.currentIndex;
			const veryCloseToUnknown =
				prev.earliestUnknown != null && Math.abs(newLastKnown - prev.earliestUnknown) < 10;
			if (veryCloseToUnknown) {
				// we are very close, reset back to more or less start
				newLastKnown = Math.floor(Math.random() * 10);
			}

			const newState = {
				...prev,
				known: prev.known.concat(prev.currentIndex),
				lastKnownBeforeUnknown: newLastKnown,
			};
			newState.currentIndex = findNextIndex(newState, "known");
			return newState;
		});
		clearDictionary();
	};

	const handleUnknownClick = () => {
		setLanguageProgress(language, (prev) => {
			const newEarliestUnknown = Math.min(
				prev.earliestUnknown ?? prev.currentIndex,
				prev.currentIndex,
			);

			const newState = {
				...prev,
				unknown: prev.unknown.concat(prev.currentIndex),
				earliestUnknown: newEarliestUnknown,
				lastKnownBeforeUnknown: prev.known
					.filter((x) => x < newEarliestUnknown)
					.reduce((acc, next) => Math.max(acc, next), 0),
			};
			newState.currentIndex = findNextIndex(newState, "unknown");
			return newState;
		});
		clearDictionary();
	};

	const handleInvalidClick = () => {
		setLanguageProgress(language, (prev) => {
			const newState = {
				...prev,
				invalid: prev.invalid.concat(prev.currentIndex),
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
				<Tooltip
					title="If you think this word is misspeled or doesn't exist, you can skip it by pressing this"
					style={{ flex: "1 0 0" }}
				>
					<Button color="neutral" onClick={handleInvalidClick} style={{ height: "100%" }}>
						Invalid
					</Button>
				</Tooltip>
			</Stack>

			<Stack direction="row" gap={2}>
				<Stack gap={1} style={{ flexShrink: 0 }}>
					<Tooltip
						disabled={apiAvailable}
						title="Dictionary definitions are not available for this language"
						style={{ alignSelf: "end" }}
					>
						<Button
							disabled={!apiAvailable}
							onClick={() => {
								fetchDefinition(currentWord);
							}}
							loading={loadingDefinitions}
						>
							Show definition
						</Button>
					</Tooltip>

					<Divider />

					<Select
						startDecorator={<LanguageIcon />}
						placeholder={
							languages.find((lang) => lang.iso === language)?.label ??
							"Select language"
						}
					>
						{languages.map((lang) => (
							<ListItemLink
								key={lang.iso}
								linkProps={{
									href: `/words/${lang.iso}` as Route,
								}}
								buttonProps={{
									active: language === lang.iso,
									size: "sm",
								}}
							>
								{lang.label}
							</ListItemLink>
						))}
					</Select>

					<CheckboxGroup
						label="Traversal mode"
						options={navigationModeOptions}
						selected={navigationMode}
						setSelected={setNavigationMode}
						type="radio"
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
