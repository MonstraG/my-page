import { DiceBag } from "@/components/DiceRoll/DiceSeletion/DiceBag";
import { parseDiceNotation } from "@/components/DiceRoll/DiceSeletion/parseDiceNotation";
import { diceArrayToRecord } from "@/components/DiceRoll/Distribution/distribution";
import { Input } from "@/ui/Input/Input";
import { MyClickLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import {
	type ChangeEvent,
	type Dispatch,
	type FC,
	type SetStateAction,
	useCallback,
	useRef,
	useState,
} from "react";

const possibleDice = [2, 4, 6, 8, 10, 12, 20] as const;

const diceSelectionInput = "dice-selection-input";

const exampleValue = [4, 8, 8] as const;

function formatToNotation(dice: readonly number[]): string {
	const diceRecord = diceArrayToRecord(dice);
	const entries = Object.entries(diceRecord).map(([die, count]) => {
		return `${count}d${die}`;
	});
	return entries.join(" + ");
}

interface Props {
	selectedDice: readonly number[];
	setSelectedDice: Dispatch<SetStateAction<readonly number[]>>;
}

export const DiceSelection: FC<Props> = ({ selectedDice, setSelectedDice }) => {
	const [invalid, setInvalid] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const setInputValue = useCallback((value: string) => {
		if (!inputRef.current) {
			console.error("Input ref has not been placed yet!");
			return;
		}
		inputRef.current.value = value;
	}, []);

	const setInputFromDiceBag = useCallback((die: readonly number[]) => {
		setInputValue(formatToNotation(die));
		setInvalid(false);
	}, [setInputValue]);

	const handleAddClick = useCallback((die: number) => {
		setSelectedDice((prev) => {
			const newValue = prev.concat(die).toSorted((a, b) => a - b);
			setInputFromDiceBag(newValue);
			return newValue;
		});
	}, [setInputFromDiceBag, setSelectedDice]);

	const handleRemoveClick = useCallback((_: unknown, index: number) => {
		setSelectedDice((prev) => {
			const newValue = prev.toSpliced(index, 1);
			setInputFromDiceBag(newValue);
			return newValue;
		});
	}, [setInputFromDiceBag, setSelectedDice]);

	const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		const result = parseDiceNotation(value);
		if (result == null) {
			setInvalid(true);
			return;
		}
		setInvalid(false);
		setSelectedDice(result);
	}, [setSelectedDice]);

	const handleExampleClick = useCallback(() => {
		setSelectedDice(exampleValue);
		setInputFromDiceBag(exampleValue);
	}, [setInputFromDiceBag, setSelectedDice]);

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

			<Stack gap={0.25}>
				<div>
					<Input
						ref={inputRef}
						id={diceSelectionInput}
						placeholder="or type here"
						defaultValue=""
						onChange={handleInputChange}
						invalid={invalid}
					/>
				</div>

				<Paragraph size="sm" color="superGray">
					Try writing{" "}
					<MyClickLink onClick={handleExampleClick}>
						{formatToNotation(exampleValue)}
					</MyClickLink>{" "}
					for example.
				</Paragraph>
			</Stack>
		</Stack>
	);
};
