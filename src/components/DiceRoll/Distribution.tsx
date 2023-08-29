import type { FC } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";

function getDistribution(dice: number, rolls: number): Record<number, number> {
	const probabilitiesTable = Array.from(Array(rolls + 1), () =>
		new Array<number>(dice * rolls + 1).fill(0)
	);
	probabilitiesTable[0][0] = 1;

	for (let roll = 1; roll <= rolls; roll++) {
		for (let sum = roll; sum <= dice * rolls; sum++) {
			for (let diceFace = 1; diceFace <= dice; diceFace++) {
				if (sum >= diceFace) {
					// Add the number of ways to get this total from the previous roll's sum (sum - diceFace).
					probabilitiesTable[roll][sum] += probabilitiesTable[roll - 1][sum - diceFace];
				}
			}
		}
	}

	const distribution: Record<number, number> = {};
	const totalOutcomes = Math.pow(dice, rolls);

	for (let sum = rolls; sum <= dice * rolls; sum++) {
		distribution[sum] = probabilitiesTable[rolls][sum] / totalOutcomes;
	}

	return distribution;
}

interface Props {
	dices: number;
	rolls: number;
}

export const Distribution: FC<Props> = ({ dices, rolls }) => {
	const canCalcDistribution =
		Number.isInteger(dices) &&
		dices >= 1 &&
		dices <= 10 &&
		Number.isInteger(rolls) &&
		rolls >= 1 &&
		rolls <= 10;

	if (!canCalcDistribution) return null;

	const distribution = getDistribution(dices, rolls); // Use the optimized function here
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));

	return (
		<>
			{Object.entries(distribution).map(([result, probability]) => (
				<div
					key={result}
					className={styles.column}
					style={{ height: (probability / max) * 100 + "%" }}
				>
					{result}
				</div>
			))}
		</>
	);
};
