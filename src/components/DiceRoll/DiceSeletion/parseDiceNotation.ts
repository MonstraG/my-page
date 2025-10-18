export function parseDiceNotation(value: string): readonly number[] | null {
	if (value.length === 0) {
		return [];
	}

	const dice = value.split(" + ");
	if (dice.length === 0) {
		return null;
	}

	const selectedDice: number[] = [];

	// for each `2d6` in whole line
	for (const dieSet of dice) {
		const parts = dieSet.split("d");
		if (parts.length !== 2) {
			return null;
		}

		const count = parseInt(parts[0], 10);
		const die = parseInt(parts[1], 10);
		if (Number.isNaN(count) || Number.isNaN(die)) {
			return null;
		}
		if (count <= 0 || die <= 0) {
			return null;
		}

		for (let i = 0; i < count; i++) {
			selectedDice.push(die);
		}
	}

	return selectedDice;
}
