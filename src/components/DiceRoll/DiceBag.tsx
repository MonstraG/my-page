import { FC } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";

function groupSame(array: number[]): number[][] {
	return array.reduce<number[][]>((acc, val) => {
		if (!acc.length || acc[acc.length - 1][0] !== val) {
			acc.push([val]);
		} else {
			acc[acc.length - 1].push(val);
		}
		return acc;
	}, []);
}

interface Props {
	title: string;
	dice: number[];
	onDiceClick: (die: number, index: number) => void;
}

export const DiceBag: FC<Props> = ({ title, dice, onDiceClick }) => (
	<div className={styles.diceSet}>
		<h2>{title}</h2>
		<div className={styles.diceButtons}>
			{groupSame(dice).map((sameSideDice, groupIndex) => (
				<div key={groupIndex}>
					{sameSideDice.map((die, dieIndex) => (
						<button
							key={dieIndex}
							onClick={() => {
								onDiceClick(die, dieIndex);
							}}
							className={styles.dieButton}
						>
							d{die}
						</button>
					))}
				</div>
			))}
		</div>
	</div>
);
