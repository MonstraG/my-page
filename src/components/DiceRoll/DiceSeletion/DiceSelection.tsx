import { DiceBag } from "@/components/DiceRoll/DiceSeletion/DiceBag";
import { Stack } from "@/ui/Stack/Stack";
import type { Dispatch, FC, SetStateAction } from "react";

const possibleDice = [2, 4, 6, 8, 10, 12, 20] as const;

interface Props {
	selectedDice: number[];
	setSelectedDice: Dispatch<SetStateAction<number[]>>;
}

export const DiceSelection: FC<Props> = ({ selectedDice, setSelectedDice }) => (
	<section>
		<h2 style={{ marginBottom: "1rem" }}>Select dice</h2>

		<Stack direction="row" style={{ justifyContent: "space-between" }} gap={2}>
			<DiceBag
				title="Add dice"
				dice={possibleDice}
				onDiceClick={(die) => {
					setSelectedDice((p) => [...p, die].toSorted((a, b) => a - b));
				}}
			/>

			<DiceBag
				disabled={selectedDice.length === 0}
				title="Remove dice"
				dice={selectedDice}
				onDiceClick={(_, index) => {
					setSelectedDice((p) => p.toSpliced(index, 1));
				}}
			/>
		</Stack>
	</section>
);
