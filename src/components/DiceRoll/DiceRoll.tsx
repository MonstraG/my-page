"use client";
import { type FC, useState } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { Distribution } from "@/components/DiceRoll/Distribution";

const dice = [2, 4, 6, 8, 10, 12, 20];

export const DiceRoll: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);

	return (
		<div>
			<h1>Dice rolling</h1>
			<div className={styles.diceControls}>
				<div className={styles.diceSet}>
					<h2>Add dice</h2>
					<div className={styles.diceButtons}>
						{dice.map((die) => (
							<button
								key={die}
								onClick={() => {
									setSelectedDice((p) => [...p, die].toSorted((a, b) => a - b));
								}}
								className={styles.dieButton}
							>
								d{die}
							</button>
						))}
					</div>
				</div>

				<div className={styles.diceSet}>
					<h2>Remove dice</h2>
					<div className={styles.diceButtons}>
						{selectedDice.map((die, index) => (
							<button
								key={index}
								onClick={() => {
									setSelectedDice((p) => p.toSpliced(index, 1));
								}}
								className={styles.dieButton}
							>
								d{die}
							</button>
						))}
					</div>
				</div>
			</div>

			<Distribution dice={selectedDice} />
		</div>
	);
};
