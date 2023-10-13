export interface RollHistory {
	latestRolls: readonly number[];
	distribution: Record<number, number>;
	count: number;
}
