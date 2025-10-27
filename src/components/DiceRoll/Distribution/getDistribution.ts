import { setOrAdd } from "./distribution.ts";
import type { RollFunction } from "./rolls.ts";

export function getDistribution(
	diceCollection: readonly number[],
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

function isEmpty(obj: Record<string | number | symbol, unknown>): obj is Record<string, never> {
	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			return false;
		}
	}
	return true;
}
