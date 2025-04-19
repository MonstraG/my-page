/**
 * Sets value in record by key if not found, otherwise adds it.
 * Mutates and returns the same record
 * @param record to modify
 * @param key to set or add to value of
 * @param value to set or add
 */
export function setOrAdd(
	record: Record<number, number>,
	key: number,
	value: number,
): Record<number, number> {
	record[key] = (record[key] || 0) + value;
	return record;
}

/**
 * @param dice array of dice, `[2, 6, 6, 8]`
 * @returns record with counts, `{2: 1, 6: 2, 8: 1}`
 * @pure
 */
export const diceArrayToRecord = (dice: number[]): Record<number, number> => {
	return dice.reduce(
		(acc, next) => setOrAdd(acc, next, 1),
		{},
	);
};
