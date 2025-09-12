import {
	makeRolls,
	type RollFunction,
	rollFunctions,
	type RollMode,
} from "@/components/DiceRoll/Distribution/rolls";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { RollHistoryDistribution } from "@/components/DiceRoll/TryRoll/RollHistoryDistribution";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { Button } from "@/ui/Button/Button";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, useCallback, useEffect, useState } from "react";
import styles from "./TryRoll.module.css";

const emptyRollHistory: RollHistory = {
	latestRolls: [],
	distribution: {},
	count: 0,
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

	const handleRollClick = useCallback(() => {
		setRollHistory((prev) => makeRolls(rollsToMake, rollMode, dice, prev));
	}, [dice, rollMode, rollsToMake]);

	if (dice.length === 0) return null;

	const madeRolls = rollHistory.count > 0;

	return (
		<Stack component="section" gap={1}>
			<h2>Try rolling</h2>
			<Stack direction="row" gap={2} className={styles.controls}>
				<Stack gap={0.5}>
					<h4>Rolls to make: {rollsToMake}</h4>

					<input
						type="range"
						value={rollsToMake}
						min={1}
						max={1000}
						onChange={(event) => {
							setRollsToMake(parseInt(event.target.value));
						}}
						style={{ width: "200px", marginInline: "0.5rem" }}
					/>

					<Button size="lg" onClick={handleRollClick} style={{ alignSelf: "center" }}>
						Roll!
					</Button>
				</Stack>

				{madeRolls
					&& (
						<Stack direction="row" gap={0.5}>
							<Stack gap={0.5}>
								<h4>Last rolls</h4>
								<ul className={styles.rollsList}>
									{rollHistory.latestRolls.toReversed().map((roll, index) => (
										<li key={index}>{roll}</li>
									))}
								</ul>
							</Stack>
							<span>•</span>

							<h4>Total rolls made: {rollHistory.count}</h4>
						</Stack>
					)}
			</Stack>

			{madeRolls && (
				<RollHistoryDistribution rollHistory={rollHistory} scrollSync={scrollSync} />
			)}
		</Stack>
	);
};
