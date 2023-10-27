import { type FC, useEffect, useState } from "react";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { RollHistoryDistribution } from "@/components/DiceRoll/TryRoll/RollHistoryDistribution";
import { Button, Slider, Stack, Typography } from "@mui/joy";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { styled } from "@mui/joy/styles";

function getRandomIntInclusive(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRoll(dice: readonly number[]): number {
	return dice.reduce((acc, dice) => acc + getRandomIntInclusive(1, dice), 0);
}

function getEmptyRollHistory(dice: readonly number[]): RollHistory {
	const minRoll = dice.length;
	const maxRoll = dice.reduce((acc, next) => acc + next, 0);

	const distribution: Record<number, number> = {};
	for (let i = minRoll; i <= maxRoll; i++) {
		distribution[i] = 0;
	}

	return {
		latestRolls: [],
		distribution,
		count: 0
	};
}

const RollsList = styled("ul")`
	list-style: none;
	padding: 0;
	margin: 0;
	mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
	height: 200px;
	overflow: hidden;
`;

const rollHistorySize = 8;

interface Props {
	dice: readonly number[];
	scrollSync: ScrollSync;
}

export const TryRoll: FC<Props> = ({ dice, scrollSync }) => {
	const [rollHistory, setRollHistory] = useState<RollHistory>(getEmptyRollHistory(dice));
	useEffect(() => {
		setRollHistory(getEmptyRollHistory(dice));
	}, [dice]);

	const [rollsToMake, setRollsToMake] = useState<number>(1);

	if (dice.length === 0) return null;

	const makeRolls = () => {
		setRollHistory((prev) => {
			const next = structuredClone(prev);

			for (let i = 0; i < rollsToMake; i++) {
				const newRoll = makeRoll(dice);
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
				<RollHistoryDistribution rollHistory={rollHistory} scrollSync={scrollSync} />
			)}
		</section>
	);
};
