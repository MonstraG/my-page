import type { Dispatch, FC, SetStateAction } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { DiceBag } from "@/components/DiceRoll/DiceBag";

const possibleDice = [2, 4, 6, 8, 10, 12, 20] as const;

interface Props {
	selectedDice: number[];
	setSelectedDice: Dispatch<SetStateAction<number[]>>;
}

export const DiceSelection: FC<Props> = ({ selectedDice, setSelectedDice }) => (
	<section>
		<h2>Select dice</h2>
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
	</section>
);
