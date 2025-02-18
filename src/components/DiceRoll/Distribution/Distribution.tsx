import { type Dispatch, type FC, type SetStateAction } from "react";
import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import Typography from "@mui/joy/Typography";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Button from "@mui/joy/Button";
import {
	type RollMode,
	type RollFunction,
	rollFunctions
} from "@/components/DiceRoll/Distribution/RollModes";

/**
 * Sets value in record by key if not found, otherwise adds it.
 * Mutates and returns the same record
 * @param record to modify
 * @param key to set or add to value of
 * @param value to set or add
 */
function setOrAdd(
	record: Record<number, number>,
	key: number,
	value: number
): Record<number, number> {
	record[key] = (record[key] || 0) + value;
	return record;
}

function isEmpty(obj: Record<string | number | symbol, unknown>): obj is Record<string, never> {
	for (const _ in obj) {
		return false;
	}
	return true;
}

export function getDistribution(
	diceCollection: number[],
	rollFunction: RollFunction
): Record<number, number> {
	return diceCollection.reduce<Record<number, number>>((prevDistribution, nextDie) => {
		const newDistribution: Record<number, number> = {};

		for (let nextDieOutcome = 1; nextDieOutcome <= nextDie; nextDieOutcome++) {
			if (isEmpty(prevDistribution)) {
				setOrAdd(newDistribution, nextDieOutcome, 1 / nextDie);
			} else {
				for (const prevOutcome in prevDistribution) {
					const newValue = rollFunction(Number(prevOutcome), nextDieOutcome);
					const prevProbability = prevDistribution[prevOutcome];
					const newValueProbability = prevProbability / nextDie;
					setOrAdd(newDistribution, newValue, newValueProbability);
				}
			}
		}

		return newDistribution;
	}, {});
}

export function getDistributionAverage(distribution: Record<number, number>): number {
	return Object.entries(distribution).reduce(
		(acc, [value, probability]) => acc + Number(value) * probability,
		0
	);
}

const englishForDiceCount: Record<number, string | undefined> = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine",
	10: "ten"
};

function joinWithAnd(input: string[]): string {
	if (input.length === 1) return input[0];
	const last = input.pop()!;
	return input.join(", ") + " and " + last;
}

function getSubtitle(dice: number[]): string {
	const distribution: Record<number, number> = dice.reduce(
		(acc, next) => setOrAdd(acc, next, 1),
		{}
	);

	const diceSetDescriptions = [];
	for (const [side, count] of Object.entries(distribution)) {
		const diceCount = englishForDiceCount[count] ?? count.toString();
		const pluralizedDice = count > 1 ? "dice" : "die";
		diceSetDescriptions.push(` ${diceCount} ${side}-sided ${pluralizedDice}`);
	}

	if (dice.length > 1) {
		return `of${joinWithAnd(diceSetDescriptions)} rolled together:`;
	}

	return `of${joinWithAnd(diceSetDescriptions)}:`;
}

interface Props {
	dice: number[];
	scrollSync: ScrollSync;
	rollMode: RollMode;
	setRollMode: Dispatch<SetStateAction<RollMode>>;
}

export const Distribution: FC<Props> = ({ dice, scrollSync, rollMode, setRollMode }) => {
	const canCalcDistribution = dice.length > 0;
	if (!canCalcDistribution) return null;

	const distribution = getDistribution(dice, rollFunctions[rollMode]);

	return (
		<section>
			<Stack direction="row" gap={2} justifyContent="space-between">
				<Box>
					<Typography level="h2" gutterBottom>
						Distribution
					</Typography>
					<Typography gutterBottom>{getSubtitle(dice)}</Typography>
				</Box>
				<Box>
					<ToggleButtonGroup
						value={rollMode}
						onChange={(_, newValue) => {
							if (newValue) {
								setRollMode(newValue);
							}
						}}
					>
						<Button color="neutral" value="sum">
							Sum
						</Button>
						<Button color="neutral" value="max">
							Max
						</Button>
						<Button color="neutral" value="min">
							Min
						</Button>
					</ToggleButtonGroup>
				</Box>
			</Stack>

			<DistributionChart distribution={distribution} scrollSync={scrollSync} />

			<Typography my={1}>
				With an average result of {Number(getDistributionAverage(distribution).toFixed(3))}
			</Typography>
		</section>
	);
};
