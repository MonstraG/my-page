import { getDistribution } from "./getDistribution.ts";
import { rollFunctions } from "./rolls.ts";
import { test } from "node:test";
import assert from "node:assert/strict";

function validateDistribution(got: Record<number, number>, want: Record<number, number>) {
	for (const outcome in want) {
		const outcomeKey = Number(outcome);
		const gotProbability = got[outcomeKey];
		const wantProbability = want[outcomeKey];
		const diff = Math.abs(gotProbability - wantProbability);
		assert.ok(diff <= 0.0001);
	}
}

// https://www.thedarkfortress.co.uk/tech_reports/3_dice_rolls.php
const sum3d6: Record<number, number> = {
	3: 0.0046,
	4: 0.0138,
	5: 0.0277,
	6: 0.0462,
	7: 0.0694,
	8: 0.0972,
	9: 0.1157,
	10: 0.125,
	11: 0.125,
	12: 0.1157,
	13: 0.0972,
	14: 0.0694,
	15: 0.0462,
	16: 0.0277,
	17: 0.0138,
	18: 0.0046,
};

test("gives correct outcomes for 3d6 sum", () => {
	const got = getDistribution([6, 6, 6], rollFunctions.sum);
	validateDistribution(got, sum3d6);
});

test("gives outcomes correct probabilities for 3d6 sum", () => {
	const got = getDistribution([6, 6, 6], rollFunctions.sum);
	validateDistribution(got, sum3d6);
});

// https://www.youtube.com/watch?v=X_DdGRjtwAo
const max2d20: Record<number, number> = {
	1: 0.0025,
	2: 0.0075,
	3: 0.0125,
	4: 0.0175,
	5: 0.0225,
	6: 0.0275,
	7: 0.0325,
	8: 0.0375,
	9: 0.0425,
	10: 0.0475,
	11: 0.0525,
	12: 0.0575,
	13: 0.0625,
	14: 0.0675,
	15: 0.0725,
	16: 0.0775,
	17: 0.0825,
	18: 0.0875,
	19: 0.0925,
	20: 0.0975,
};

test("gives correct outcomes for 2d20 max", () => {
	const got = getDistribution([20, 20], rollFunctions.max);
	validateDistribution(got, max2d20);
});

test("gives correct outcome probabilities for 2d20 max", () => {
	const got = getDistribution([20, 20], rollFunctions.max);
	validateDistribution(got, max2d20);
});
