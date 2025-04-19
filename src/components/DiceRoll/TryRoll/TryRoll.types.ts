export interface RollHistory {
	latestRolls: readonly number[];
	distribution: Record<number, number>;
	count: number;
}

export const rollHistorySize = 5;
