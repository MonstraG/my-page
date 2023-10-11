import { FC, useEffect, useState } from "react";
import styles from "@/components/DiceRoll/TryRoll.module.scss";
import { DistributionChart } from "@/components/DiceRoll/DistributionChart";

function getRandomIntInclusive(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollHistoryToDistribution(
	min: number,
	max: number,
	rolls: number[]
): Record<number, number> {
	const distribution: Record<number, number> = {};
	for (let i = min; i <= max; i++) {
		distribution[i] = 0;
	}

	rolls.forEach((roll) => (distribution[roll] += 1));

	for (let i = min; i <= max; i++) {
		distribution[i] = distribution[i] / rolls.length;
	}
	return distribution;
}

interface Props {
	dice: number[];
}

export const TryRoll: FC<Props> = ({ dice }) => {
	const [rollHistory, setRollHistory] = useState<number[]>([]);
	useEffect(() => {
		setRollHistory([]);
	}, [dice]);

	if (dice.length === 0) return null;

	return (
		<section className={styles.section}>
			<h2>Try rolling</h2>
			<div className={styles.stack}>
				<button
					className={styles.rollButton}
					onClick={() => {
						const newRoll = dice.reduce(
							(acc, dice) => acc + getRandomIntInclusive(1, dice),
							0
						);
						setRollHistory((prev) => [...prev, newRoll]);
					}}
				>
					Try rolling!
				</button>
				{rollHistory.length > 0 && (
					<>
						<div>
							<h3>Last rolls:</h3>
							<ul>
								{rollHistory.slice(-10).map((roll, index) => (
									<li key={index}>{roll}</li>
								))}
							</ul>
						</div>
						<DistributionChart
							distribution={rollHistoryToDistribution(
								dice.length,
								dice.reduce((acc, next) => acc + next, 0),
								rollHistory
							)}
						/>
					</>
				)}
			</div>
		</section>
	);
};
