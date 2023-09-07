import { FC } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";

interface Props {
	title: string;
	dice: number[];
	onDiceClick: (die: number, index: number) => void;
}

export const DiceBag: FC<Props> = ({ title, dice, onDiceClick }) => (
	<div className={styles.diceSet}>
		<h2>{title}</h2>
		<div className={styles.diceButtons}>
			{dice.map((die, index) => (
				<button
					key={index}
					onClick={() => {
						onDiceClick(die, index);
					}}
					className={styles.dieButton}
				>
					d{die}
				</button>
			))}
		</div>
	</div>
);
