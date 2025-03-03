import { type FC, useCallback, useEffect, useState } from "react";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { RollHistoryDistribution } from "@/components/DiceRoll/TryRoll/RollHistoryDistribution";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import {
	type RollMode,
	type RollFunction,
	rollFunctions
} from "@/components/DiceRoll/Distribution/RollModes";
import { Stack } from "@/ui/Stack/Stack";
import { Button } from "@/ui/Button/Button";
import styles from "./RollsList.module.css";

function getRandomIntInclusive(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeRoll(diceCollection: readonly number[], rollFunction: RollFunction) {
	if (diceCollection.length == 0) {
		return 0;
	}

	let result = getRandomIntInclusive(1, diceCollection[1]);

	if (diceCollection.length == 1) {
		return result;
	}

	for (const dice of diceCollection.slice(1)) {
		result = rollFunction(result, getRandomIntInclusive(1, dice));
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

const rollHistorySize = 5;

interface Props {
	dice: readonly number[];
	scrollSync: ScrollSync;
	rollMode: RollMode;
}

export const TryRoll: FC<Props> = ({ dice, scrollSync, rollMode }) => {
	const [rollHistory, setRollHistory] = useState<RollHistory>(emptyRollHistory);
	useEffect(() => {
		setRollHistory(getEmptyRollHistory(dice, rollFunctions[rollMode]));
	}, [dice, rollMode]);

	const [rollsToMake, setRollsToMake] = useState<number>(1);

	const makeRolls = useCallback(() => {
		const rollFunction = rollFunctions[rollMode];

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
	}, [dice, rollMode, rollsToMake]);

	if (dice.length === 0) return null;

	const madeRolls = rollHistory.count > 0;

	return (
		<section>
			<h2>Try rolling</h2>
			<Stack direction="row" gap={2}>
				<Stack gap={0.5}>
					<h3>Rolls to make: {rollsToMake}</h3>

					<input
						type="range"
						value={rollsToMake}
						min={1}
						max={1000}
						onChange={(event) => setRollsToMake(parseInt(event.target.value))}
						style={{ width: "200px", marginInline: "0.5rem" }}
					/>

					<Button size="lg" onClick={makeRolls} style={{ alignSelf: "center" }}>
						Roll!
					</Button>
				</Stack>

				{madeRolls && (
					<Stack gap={2}>
						<h3>Last rolls</h3>
						<ul className={styles.rollsList}>
							{rollHistory.latestRolls.toReversed().map((roll, index) => (
								<li key={index}>{roll}</li>
							))}
						</ul>
					</Stack>
				)}

				{madeRolls && <h3>Total rolls made: {rollHistory.count}</h3>}
			</Stack>

			{madeRolls && (
				<RollHistoryDistribution rollHistory={rollHistory} scrollSync={scrollSync} />
			)}
		</section>
	);
};
