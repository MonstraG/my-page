import { diceImages } from "@/components/DiceRoll/DiceSeletion/diceImages";
import { Stack } from "@/ui/Stack/Stack";
import { clsx } from "clsx";
import type { FC } from "react";
import styles from "./DiceBag.module.css";

function groupSame(array: readonly number[]): readonly number[][] {
	const acc: Record<number, number[]> = {};
	for (const number of array) {
		if (number in acc) {
			acc[number].push(number);
		} else {
			acc[number] = [number];
		}
	}
	return Object.values(acc);
}

interface Props {
	title: string;
	dice: readonly number[];
	onDiceClick: (die: number, index: number) => void;
	disabled?: boolean;
}

export const DiceBag: FC<Props> = ({ title, dice, onDiceClick, disabled }) => (
	<Stack style={{ alignItems: "center", flex: "1 0 0" }}>
		<h3 className={clsx(styles.header, disabled && styles.disabled)}>{title}</h3>

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
							type="button"
						>
							{diceImages[die]}
						</button>
					))}
				</Stack>
			))}
		</Stack>
	</Stack>
);
