import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from "react";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { RollHistoryDistribution } from "@/components/DiceRoll/TryRoll/RollHistoryDistribution";
import Button from "@mui/joy/Button";
import Slider from "@mui/joy/Slider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { styled } from "@mui/joy/styles";
import {
	type RollMode,
	type RollFunction,
	rollFunctions
} from "@/components/DiceRoll/Distribution/RollModes";

function getRandomIntInclusive(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRoll(diceCollection: readonly number[], rollFunction: RollFunction) {
	if (diceCollection.length == 0) {
		return 0;
	}

	let result = getRandomIntInclusive(1, diceCollection[1]);

	if (diceCollection.length == 1) {
		if (isNaN(result)) {
			console.log("1", diceCollection);
		}
		return result;
	}

	for (const dice of diceCollection.slice(1)) {
		result = rollFunction(result, getRandomIntInclusive(1, dice));
	}
	if (isNaN(result)) {
		console.log("2", diceCollection);
	}
	return result;
}

const emptyRollHistory: RollHistory = {
	latestRolls: [],
	distribution: {},
	count: 0
};

function getEmptyRollHistory(dice: readonly number[], rollFunction: RollFunction): RollHistory {
	if (dice.length === 0) {
		return emptyRollHistory;
	}
	const minResult = dice.map(() => 1).reduce((acc, next) => rollFunction(acc, next));
	const maxResult = dice.map((d) => d).reduce((acc, next) => rollFunction(acc, next));

	const distribution: Record<number, number> = {};
	for (let i = minResult; i <= maxResult; i++) {
		distribution[i] = 0;
	}

	return { ...emptyRollHistory, distribution };
}

const RollsList = styled("ul")`
	list-style: none;
	padding: 0;
	margin: 0;
	mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
	overflow: hidden;
`;

const rollHistorySize = 5;

interface Props {
	dice: readonly number[];
	scrollSync: ScrollSync;
	rollMode: RollMode;
	openTooltip: number | null;
	setOpenTooltip: Dispatch<SetStateAction<number | null>>;
}

export const TryRoll: FC<Props> = ({ dice, scrollSync, rollMode, openTooltip, setOpenTooltip }) => {
	const [rollHistory, setRollHistory] = useState<RollHistory>(emptyRollHistory);
	useEffect(() => {
		setRollHistory(getEmptyRollHistory(dice, rollFunctions[rollMode]));
	}, [dice, rollMode]);

	const [rollsToMake, setRollsToMake] = useState<number>(1);

	if (dice.length === 0) return null;

	const rollFunction = rollFunctions[rollMode];

	const makeRolls = () => {
		setRollHistory((prev) => {
			const next = structuredClone(prev);

			for (let i = 0; i < rollsToMake; i++) {
				const newRoll = makeRoll(dice, rollFunction);
				next.distribution[newRoll] += 1;

				// start updating rolls when we get to visible history
				const rollsLeftOver = rollsToMake - i - 1;
				if (rollsLeftOver < rollHistorySize) {
					next.latestRolls = [...next.latestRolls.slice(-(rollHistorySize - 1)), newRoll];
				}
			}

			next.count += rollsToMake;

			return next;
		});
	};

	const madeRolls = rollHistory.count > 0;

	return (
		<section>
			<Typography level="h2" gutterBottom>
				Try rolling
			</Typography>
			<Stack direction="row" spacing={4}>
				<Stack gap={1}>
					<Typography level="h3">Rolls to make: {rollsToMake}</Typography>

					<Slider
						min={1}
						max={1000}
						value={rollsToMake}
						onChange={(_, value) => {
							setRollsToMake(value as number);
						}}
						sx={{ width: "200px", mx: 1 }}
					/>

					<Button
						size="lg"
						color="neutral"
						onClick={makeRolls}
						sx={{ alignSelf: "center" }}
					>
						Roll!
					</Button>
				</Stack>

				{madeRolls && (
					<Stack spacing={2}>
						<Typography level="h3">Last rolls</Typography>
						<RollsList>
							{rollHistory.latestRolls.toReversed().map((roll, index) => (
								<li key={index}>{roll}</li>
							))}
						</RollsList>
					</Stack>
				)}

				{madeRolls && (
					<Typography level="h3">Total rolls made: {rollHistory.count}</Typography>
				)}
			</Stack>

			{madeRolls && (
				<RollHistoryDistribution
					rollHistory={rollHistory}
					scrollSync={scrollSync}
					openTooltip={openTooltip}
					setOpenTooltip={setOpenTooltip}
				/>
			)}
		</section>
	);
};
