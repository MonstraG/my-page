import type { FC, ReactNode } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { D10, D12, D2, D20, D4, D6, D8 } from "@/components/DiceRoll/diceImages";

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

export const DiceBag: FC<Props> = ({ title, dice, onDiceClick }) => {
	// must be declared in render function to make sure it updates from the theme mode
	const diceImages: Record<number, ReactNode> = {
		2: <D2 />,
		4: <D4 />,
		6: <D6 />,
		8: <D8 />,
		10: <D10 />,
		12: <D12 />,
		20: <D20 />
	};

	return (
		<div className={styles.diceSet}>
			<h3>{title}</h3>
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
								{diceImages[die]}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
