/**
 * Sets value in record by key if not found, otherwise adds it.
 * Mutates the record
 * @param record to modify
 * @param key to set or add to value of
 * @param value to set or add
 * @sideEffects
 */
export function setOrAdd(record: Record<number, number>, key: number, value: number): void {
	record[key] = (record[key] ?? 0) + value;
}

/**
 * @param dice array of dice, `[2, 6, 6, 8]`
 * @returns record with counts, `{2: 1, 6: 2, 8: 1}`
 * @pure
 */
export const diceArrayToRecord = (dice: readonly number[]): Record<number, number> => {
	const acc: Record<number, number> = {};
	for (const die of dice) {
		setOrAdd(acc, die, 1);
	}
	return acc;
};
