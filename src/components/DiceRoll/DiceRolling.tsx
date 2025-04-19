"use client";
import { DiceSelection } from "@/components/DiceRoll/DiceSeletion/DiceSelection";
import { Distribution } from "@/components/DiceRoll/Distribution/Distribution";
import type { RollMode } from "@/components/DiceRoll/Distribution/rolls";
import { useScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { TryRoll } from "@/components/DiceRoll/TryRoll/TryRoll";
import { type FC, useState } from "react";

export const DiceRolling: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);
	const [rollMode, setRollMode] = useState<RollMode>("sum");

	const [theoryScroll, practiceScroll] = useScrollSync();

	return (
		<>
			<DiceSelection selectedDice={selectedDice} setSelectedDice={setSelectedDice} />

			<Distribution
				dice={selectedDice}
				scrollSync={theoryScroll}
				rollMode={rollMode}
				setRollMode={setRollMode}
			/>

			<TryRoll dice={selectedDice} scrollSync={practiceScroll} rollMode={rollMode} />
		</>
	);
};
