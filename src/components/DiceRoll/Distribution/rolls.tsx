import { type RollHistory, rollHistorySize } from "@/components/DiceRoll/TryRoll/TryRoll.types";

export type RollMode = "sum" | "max" | "min";

export type RollFunction = (diceRollA: number, diceRollB: number) => number;

export const rollFunctions: Record<RollMode, RollFunction> = {
	sum: (a, b) => a + b,
	max: (a, b) => Math.max(a, b),
	min: (a, b) => Math.min(a, b),
};

/** @pure */
function getRandomIntInclusive(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** @pure */
export function makeRoll(diceCollection: readonly number[], rollFunction: RollFunction): number {
	if (diceCollection.length == 0) {
		return 0;
	}

	// first rounds must pass separately, as there is no sane initial result I can give
	// that will work for all rollFunctions
	let result = getRandomIntInclusive(1, diceCollection[0]);
	if (diceCollection.length === 1) {
		return result;
	}
	for (const dice of diceCollection.slice(1)) {
		result = rollFunction(result, getRandomIntInclusive(1, dice));
	}
	return result;
}

/** @pure */
export function makeRolls(
	rollsToMake: number,
	rollMode: RollMode,
	diceCollection: readonly number[],
	prevRollHistory: RollHistory,
): RollHistory {
	const rollFunction = rollFunctions[rollMode];

	const newRollHistory = structuredClone(prevRollHistory);

	for (let i = 0; i < rollsToMake; i++) {
		// record the new roll
		const newRoll = makeRoll(diceCollection, rollFunction);
		newRollHistory.distribution[newRoll] += 1;

		// start updating rolls when we get to visible history
		const rollsLeftOver = rollsToMake - i - 1;
		if (rollsLeftOver < rollHistorySize) {
			newRollHistory.latestRolls = [
				...newRollHistory.latestRolls.slice(-(rollHistorySize - 1)),
				newRoll,
			];
		}
	}

	// and update the count in one op, instead of doing +1's multiple times
	newRollHistory.count += rollsToMake;

	return newRollHistory;
}
