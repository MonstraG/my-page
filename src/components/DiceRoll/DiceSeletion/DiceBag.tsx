import type { FC } from "react";
import { diceImages } from "@/components/DiceRoll/DiceSeletion/diceImages";
import { Stack } from "@/ui/Stack/Stack";
import styles from "./DiceBag.module.css";

function groupSame(array: readonly number[]): readonly number[][] {
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
	dice: readonly number[];
	onDiceClick: (die: number, index: number) => void;
}

export const DiceBag: FC<Props> = ({ title, dice, onDiceClick }) => (
	<Stack style={{ width: "328px", alignItems: "center" }}>
		<h3 style={{ marginBottom: "1rem" }}>{title}</h3>

		<Stack direction="row" style={{ flexWrap: "wrap", alignItems: "center" }} gap={0.5}>
			{groupSame(dice).map((sameSideDice, groupIndex) => (
				<Stack
					direction="row"
					style={{ flexWrap: "wrap", alignItems: "center" }}
					key={groupIndex}
					gap={0.25}
				>
					{sameSideDice.map((die, dieIndex) => (
						<button
							className={styles.diceButton}
							key={dieIndex}
							onClick={() => {
								onDiceClick(die, dieIndex);
							}}
						>
							{diceImages[die]}
						</button>
					))}
				</Stack>
			))}
		</Stack>
	</Stack>
);
