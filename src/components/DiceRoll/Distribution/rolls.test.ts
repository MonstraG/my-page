import { makeRoll, makeRolls, rollFunctions } from "./rolls.ts";
import { type RollHistory, rollHistorySize } from "../TryRoll/TryRoll.types.ts";
import { test } from "node:test";
import assert from "node:assert/strict";

test("makeRoll returns nothing for empty dice set", () => {
	assert.deepStrictEqual(makeRoll([], rollFunctions.sum), 0);
});

test("makeRoll return is in bounds", () => {
	const roll = makeRoll([6], rollFunctions.sum);
	assert.ok(roll >= 1);
	assert.ok(roll <= 6);
});

test("makeRoll return sum is in bounds", () => {
	const roll = makeRoll([6, 6, 6, 6, 6, 6], rollFunctions.sum);
	assert.ok(roll >= 6);
	assert.ok(roll <= 36);
});

test("makeRoll returns min properly", () => {
	const roll = makeRoll([1, 100], rollFunctions.min);
	assert.deepStrictEqual(roll, 1);
});

test("makeRolls plausibly updates history", () => {
	const history: RollHistory = {
		distribution: { 2: 0, 3: 0, 4: 0 },
		count: 0,
		latestRolls: [],
	};

	const rollsToMake = 1000;

	const updated = makeRolls(rollsToMake, "sum", [2, 2], history);
	assert.deepStrictEqual(updated.count, rollsToMake);
	assert.deepStrictEqual(updated.latestRolls.length, rollHistorySize);
	assert.deepStrictEqual(Object.keys(updated.distribution), Object.keys(history.distribution));
});
