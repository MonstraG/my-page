"use client";
import { type FC, useState } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { Distribution } from "@/components/DiceRoll/Distribution";
import { DiceBag } from "@/components/DiceRoll/DiceBag";

const possibleDice = [2, 4, 6, 8, 10, 12, 20];

export const DiceRoll: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);

	return (
		<div>
			<h1>Dice rolling</h1>
			<div className={styles.diceControls}>
				<DiceBag
					title="Add dice"
					dice={possibleDice}
					onDiceClick={(die) => {
						setSelectedDice((p) => [...p, die].toSorted((a, b) => a - b));
					}}
				/>

				<DiceBag
					title="Remove dice"
					dice={selectedDice}
					onDiceClick={(_, index) => {
						setSelectedDice((p) => p.toSpliced(index, 1));
					}}
				/>
			</div>

			<Distribution dice={selectedDice} />
		</div>
	);
};
