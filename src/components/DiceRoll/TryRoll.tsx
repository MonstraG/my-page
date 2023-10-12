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

const getEmptyRollHistory = (dice: readonly number[]): RollHistory => {
	const minRoll = dice.length;
	const maxRoll = dice.reduce((acc, next) => acc + next, 0);

	const distribution: Record<number, number> = {};
	for (let i = minRoll; i <= maxRoll; i++) {
		distribution[i] = 0;
	}

	return {
		latestRolls: [],
		distribution: {},
		count: 0
	};
};

interface Props {
	dice: readonly number[];
}

export const TryRoll: FC<Props> = ({ dice }) => {
	const [rollHistory, setRollHistory] = useState<RollHistory>(getEmptyRollHistory(dice));
	useEffect(() => {
		setRollHistory(getEmptyRollHistory(dice));
	}, [dice]);

	if (dice.length === 0) return null;

	const makeRoll = () => {
		const newRoll = dice.reduce((acc, dice) => acc + getRandomIntInclusive(1, dice), 0);
		setRollHistory((prev) => {
			prev.distribution[newRoll] += 1;
			return {
				latestRolls: [...prev.latestRolls.slice(-9), newRoll],
				count: prev.count + 1,
				distribution: prev.distribution
			};
		});
	};

	return (
		<section className={styles.section}>
			<h2>Try rolling</h2>
			<div className={styles.stack}>
				<button className={styles.rollButton} onClick={makeRoll}>
					Try rolling!
				</button>
				{rollHistory.count > 0 && (
					<>
						<div>
							<h3>Last rolls:</h3>
							<ul>
								{rollHistory.latestRolls.slice(-10).map((roll, index) => (
									<li key={index}>{roll}</li>
								))}
							</ul>
						</div>
						<DistributionChart distribution={probabilityFromRollHistory(rollHistory)} />
					</>
				)}
			</div>
		</section>
	);
};
