import { FC, useEffect, useState } from "react";
import styles from "@/components/DiceRoll/TryRoll.module.scss";
import { DistributionChart } from "@/components/DiceRoll/DistributionChart";

function getRandomIntInclusive(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface RollHistory {
	latestRolls: readonly number[];
	distribution: Record<number, number>;
	count: number;
}

function probabilityFromRollHistory(rollHistory: RollHistory): Record<number, number> {
	const probabilityDistribution: Record<number, number> = {};
	for (const roll in rollHistory.distribution) {
		probabilityDistribution[roll] = rollHistory.distribution[roll] / rollHistory.count;
	}
	return probabilityDistribution;
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

	return (
		<section className={styles.section}>
			<h2>Try rolling</h2>
			<div className={styles.row}>
				<div className={styles.col}>
					<h3 className={styles.m0}>Rolls to make: {rollsToMake}</h3>
					<input
						type="range"
						min={1}
						max={1000}
						value={rollsToMake}
						onChange={(e) => {
							setRollsToMake(parseInt(e.target.value));
						}}
					/>

					<button className={styles.rollButton} onClick={makeRolls}>
						Roll!
					</button>
				</div>

				{rollHistory.count > 0 && (
					<div className={styles.col}>
						<h3 className={styles.m0}>Total rolls made: {rollHistory.count}</h3>
						<div className={styles.row}>
							<div className={styles.col}>
								<h4 className={styles.m0}>Last rolls</h4>
								<ul className={styles.noStylesList}>
									{rollHistory.latestRolls.toReversed().map((roll, index) => (
										<li key={index}>{roll}</li>
									))}
								</ul>
							</div>
							<div className={styles.col}>
								<h4 className={styles.m0}>Distribution so far</h4>
								<DistributionChart
									distribution={probabilityFromRollHistory(rollHistory)}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};
