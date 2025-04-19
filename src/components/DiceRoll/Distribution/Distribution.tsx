import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import {
	type RollFunction,
	rollFunctions,
	type RollMode,
} from "@/components/DiceRoll/Distribution/rolls";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { Button } from "@/ui/Button/Button";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import { type Dispatch, type FC, type SetStateAction } from "react";
import styles from "./Distribution.module.css";

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
	value: number,
): Record<number, number> {
	record[key] = (record[key] || 0) + value;
	return record;
}

function isEmpty(obj: Record<string | number | symbol, unknown>): obj is Record<string, never> {
	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			return false;
		}
	}
	return true;
}

export function getDistribution(
	diceCollection: number[],
	rollFunction: RollFunction,
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
		0,
	);
}

const formatDiceCount = (() => {
	const spelledOutCounts: Record<number, string | undefined> = {
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		10: "ten",
	};
	const numberFormat = new Intl.NumberFormat("en");

	return (count: number) => {
		return spelledOutCounts[count] ?? numberFormat.format(count);
	};
})();

const formatDiceWord = (() => {
	const pluralRules = new Intl.PluralRules("en");

	return (count: number) => {
		const category = pluralRules.select(count);
		return category === "one" ? "die" : "dice";
	};
})();

const listFormat = new Intl.ListFormat("en");

function getSubtitle(dice: number[]): string {
	const distribution: Record<number, number> = dice.reduce(
		(acc, next) => setOrAdd(acc, next, 1),
		{},
	);

	const diceSetDescriptions = Object.entries(distribution).map(([side, count]) =>
		`${formatDiceCount(count)} ${side}-sided ${formatDiceWord(count)}`
	);

	if (dice.length > 1) {
		return `of ${listFormat.format(diceSetDescriptions)} rolled together:`;
	}

	return `of ${listFormat.format(diceSetDescriptions)}:`;
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
			<Stack
				direction="row"
				gap={1}
				className={styles.controls}
			>
				<div>
					<h2 style={{ marginBottom: "1rem" }}>Distribution</h2>
					<Paragraph>{getSubtitle(dice)}</Paragraph>
				</div>
				<Stack direction="row" style={{ alignItems: "end" }} gap={0.25}>
					<Button
						color="neutral"
						value="sum"
						active={rollMode === "sum"}
						onClick={() => setRollMode("sum")}
					>
						Sum
					</Button>
					<Button
						color="neutral"
						value="max"
						active={rollMode === "max"}
						onClick={() => setRollMode("max")}
					>
						Max
					</Button>
					<Button
						color="neutral"
						value="min"
						active={rollMode === "min"}
						onClick={() => setRollMode("min")}
					>
						Min
					</Button>
				</Stack>
			</Stack>

			<DistributionChart distribution={distribution} scrollSync={scrollSync} />

			<Paragraph style={{ marginBlock: "0.5rem" }}>
				With an average result of {Number(getDistributionAverage(distribution).toFixed(3))}
			</Paragraph>
		</section>
	);
};
