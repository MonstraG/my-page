export type RollMode = "sum" | "max" | "min";

export type RollFunction = (diceRollA: number, diceRollB: number) => number;

export const rollFunctions: Record<RollMode, RollFunction> = {
	sum: (a, b) => a + b,
	max: (a, b) => Math.max(a, b),
	min: (a, b) => Math.min(a, b),
};
