import { type FC, useEffect, useState } from "react";
import styles from "@/components/DiceRoll/TryRoll/TryRoll.module.scss";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { RollHistoryDistribution } from "@/components/DiceRoll/TryRoll/RollHistoryDistribution";
import Button from "@mui/joy/Button";
import { Slider, Stack } from "@mui/joy";

function getRandomIntInclusive(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRoll(dice: readonly number[]): number {
	return dice.reduce((acc, dice) => acc + getRandomIntInclusive(1, dice), 0);
}

const getEmptyRollHistory = (dice: readonly number[]): RollHistory => {
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
};

const rollHistorySize = 8;

interface Props {
	dice: readonly number[];
}

export const TryRoll: FC<Props> = ({ dice }) => {
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
		<section className={styles.section}>
			<h2>Try rolling</h2>
			<Stack direction="row" spacing={4}>
				<Stack spacing={2}>
					<h3 className={styles.m0}>Rolls to make: {rollsToMake}</h3>

					<Slider
						min={1}
						max={1000}
						value={rollsToMake}
						onChange={(_, value) => {
							setRollsToMake(value as number);
						}}
						sx={{ width: "200px" }}
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
						<h3 className={styles.m0}>Last rolls</h3>
						<ul className={styles.noStylesList}>
							{rollHistory.latestRolls.toReversed().map((roll, index) => (
								<li key={index}>{roll}</li>
							))}
						</ul>
					</Stack>
				)}

				{madeRolls && <h3 className={styles.m0}>Total rolls made: {rollHistory.count}</h3>}
			</Stack>

			{madeRolls && <RollHistoryDistribution rollHistory={rollHistory} />}
		</section>
	);
};
