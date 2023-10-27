"use client";
import { type FC, useState } from "react";
import { Distribution } from "@/components/DiceRoll/Distribution";
import { TryRoll } from "@/components/DiceRoll/TryRoll/TryRoll";
import { DiceSelection } from "@/components/DiceRoll/DiceSelection";

export const DiceRolling: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);

	return (
		<>
			<h1>Dice rolling</h1>

			<DiceSelection selectedDice={selectedDice} setSelectedDice={setSelectedDice} />

			<Distribution dice={selectedDice} />

			<TryRoll dice={selectedDice} />
		</>
	);
};
