import "@testing-library/jest-dom";
import { getDistribution } from "@/components/DiceRoll/Distribution/Distribution";

describe("getDistribution", () => {
	// https://www.thedarkfortress.co.uk/tech_reports/3_dice_rolls.php
	const want: Record<number, number> = {
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
		18: 0.0046
	};

	it("gives correct outcomes for 3d6", () => {
		const got = getDistribution([6, 6, 6]);
		expect(Object.keys(got)).toEqual(Object.keys(got));
	});

	it("gives outcomes correct probabilities for 3d6", () => {
		const got = getDistribution([6, 6, 6]);
		for (const outcome in want) {
			const outcomeKey = Number(outcome);
			const gotProbability = got[outcomeKey];
			const wantProbability = want[outcomeKey];
			const diff = Math.abs(gotProbability - wantProbability);
			expect(diff).toBeLessThanOrEqual(0.0001);
		}
	});
});
