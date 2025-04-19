import { DiceBag } from "@/components/DiceRoll/DiceSeletion/DiceBag";
import { diceArrayToRecord } from "@/components/DiceRoll/Distribution/distribution";
import { Input } from "@/ui/Input/Input";
import { Stack } from "@/ui/Stack/Stack";
import { type Dispatch, type FC, type SetStateAction, useCallback, useRef } from "react";

const possibleDice = [2, 4, 6, 8, 10, 12, 20] as const;

const diceSelectionInput = "dice-selection-input";

function formatToNotation(dice: number[]): string {
	const diceRecord = diceArrayToRecord(dice);
	const entries = Object.entries(diceRecord).map(([die, count]) => {
		return `${count}d${die}`;
	});
	return entries.join(" + ");
}

interface Props {
	selectedDice: number[];
	setSelectedDice: Dispatch<SetStateAction<number[]>>;
}

export const DiceSelection: FC<Props> = ({ selectedDice, setSelectedDice }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const setInputValue = useCallback((value: string) => {
		if (!inputRef.current) {
			console.error("Input ref has not been placed yet!");
			return;
		}
		inputRef.current.value = value;
	}, []);

	const handleAddClick = useCallback((die: number) => {
		return setSelectedDice((prev) => {
			const newValue = [...prev, die].toSorted((a, b) => a - b);
			setInputValue(formatToNotation(newValue));
			return newValue;
		});
	}, [setInputValue, setSelectedDice]);

	const handleRemoveClick = useCallback((_: unknown, index: number) => {
		return setSelectedDice((prev) => {
			const newValue = prev.toSpliced(index, 1);
			setInputValue(formatToNotation(newValue));
			return newValue;
		});
	}, [setInputValue, setSelectedDice]);

	return (
		<Stack component="section" gap={2} style={{ alignItems: "stretch" }}>
			<h2>
				<label htmlFor="diceSelectionInput">Select dice</label>
			</h2>

			<Stack direction="row" style={{ justifyContent: "space-between" }} gap={2}>
				<DiceBag
					title="Add dice"
					dice={possibleDice}
					onDiceClick={handleAddClick}
				/>

				<DiceBag
					disabled={selectedDice.length === 0}
					title="Remove dice"
					dice={selectedDice}
					onDiceClick={handleRemoveClick}
				/>
			</Stack>

			<div>
				<Input
					ref={inputRef}
					id={diceSelectionInput}
					placeholder="or type here"
					defaultValue=""
					disabled
				/>
			</div>
		</Stack>
	);
};
