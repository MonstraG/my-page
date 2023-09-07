import type { FC } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { useTooltipController } from "@/components/Tooltip/useTooltipController";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { MouseEvent } from "react";

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

function getComplexDistribution(diceCollection: number[]): Record<number, number> {
	return diceCollection.reduce(
		(distribution: Record<number, number>, sides: number) => {
			const newDistribution: Record<number, number> = {};

			for (const diceSum in distribution) {
				for (let diceNum = 1; diceNum <= sides; diceNum++) {
					const newSum = parseInt(diceSum) + diceNum;
					setOrAdd(newDistribution, newSum, distribution[diceSum] / sides);
				}
			}

			return newDistribution;
		},
		{ 0: 1 }
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
		return `of${joinWithAnd(diceSetDescriptions)} rolled together`;
	}

	return `of${joinWithAnd(diceSetDescriptions)}`;
}

interface Props {
	dice: number[];
}

export const Distribution: FC<Props> = ({ dice }) => {
	const canCalcDistribution = dice.length > 0;

	const tooltip = useTooltipController<number>();

	if (!canCalcDistribution) return null;

	const distribution = getComplexDistribution(dice);
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));

	return (
		<>
			<h2>Distribution</h2>
			<h4>{getSubtitle(dice)}</h4>
			<div className={styles.distributionContainer}>
				{Object.entries(distribution).map(([result, probability]) => (
					<div
						key={result}
						className={styles.columnHost}
						onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
							tooltip.controls.open(event.currentTarget, probability);
						}}
						onMouseLeave={tooltip.controls.close}
					>
						<div className={styles.columnOutline}>
							<div
								className={styles.column}
								style={{ height: (probability / max) * 100 + "%" }}
							>
								{result}
							</div>
						</div>
					</div>
				))}

				<Tooltip tooltip={tooltip}>
					{((tooltip.context ?? 0) * 100).toFixed(2) + "%"}
				</Tooltip>
			</div>
		</>
	);
};
