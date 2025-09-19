import { makeRoll, makeRolls, rollFunctions } from "@/components/DiceRoll/Distribution/rolls";
import { type RollHistory, rollHistorySize } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { expect, test } from "vitest";

test("makeRoll returns nothing for empty dice set", () => {
	expect(makeRoll([], rollFunctions.sum)).toBe(0);
});

test("makeRoll return is in bounds", () => {
	const roll = makeRoll([6], rollFunctions.sum);
	expect(roll).toBeGreaterThanOrEqual(1);
	expect(roll).toBeLessThanOrEqual(6);
});

test("makeRoll return sum is in bounds", () => {
	const roll = makeRoll([6, 6, 6, 6, 6, 6], rollFunctions.sum);
	expect(roll).toBeGreaterThanOrEqual(6);
	expect(roll).toBeLessThanOrEqual(36);
});

test("makeRoll returns min properly", () => {
	const roll = makeRoll([1, 100], rollFunctions.min);
	expect(roll).toBe(1);
});

test("makeRolls plausibly updates history", () => {
	const history: RollHistory = {
		distribution: { 2: 0, 3: 0, 4: 0 },
		count: 0,
		latestRolls: [],
	};

	const rollsToMake = 1000;

	const updated = makeRolls(rollsToMake, "sum", [2, 2], history);
	expect(updated.count).toBe(rollsToMake);
	expect(updated.latestRolls).length(rollHistorySize);
	expect(Object.keys(updated.distribution)).length(Object.keys(history.distribution).length);
});
