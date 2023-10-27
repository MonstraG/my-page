import type { FC } from "react";
import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import { Typography } from "@mui/joy";

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
	if (record[key]) {
		record[key] += value;
	} else {
		record[key] = value;
	}
	return record;
}

export function getDistribution(diceCollection: number[]): Record<number, number> {
	return diceCollection.reduce(
		(currentDistribution: Record<number, number>, thisDie: number) => {
			const newDistribution: Record<number, number> = {};

			for (let outcome = 1; outcome <= thisDie; outcome++) {
				for (const existingSum in currentDistribution) {
					const newSum = parseInt(existingSum) + outcome;
					const probability = currentDistribution[existingSum] / thisDie;
					setOrAdd(newDistribution, newSum, probability);
				}
			}

			return newDistribution;
		},
		{ 0: 1 } // In the beginning, there is a 100% probability of having a total sum of 0
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
	const last = input.pop();
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
}

export const Distribution: FC<Props> = ({ dice }) => {
	const canCalcDistribution = dice.length > 0;
	if (!canCalcDistribution) return null;

	return (
		<section>
			<Typography level="h2" gutterBottom>
				Distribution
			</Typography>
			<Typography gutterBottom>{getSubtitle(dice)}</Typography>
			<DistributionChart distribution={getDistribution(dice)} />
		</section>
	);
};