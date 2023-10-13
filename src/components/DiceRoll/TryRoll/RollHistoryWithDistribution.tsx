import { FC } from "react";
import styles from "@/components/DiceRoll/TryRoll/TryRoll.module.scss";
import { DistributionChart } from "@/components/DiceRoll/DistributionChart";
import { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";

function probabilityFromRollHistory(rollHistory: RollHistory): Record<number, number> {
	const probabilityDistribution: Record<number, number> = {};
	for (const roll in rollHistory.distribution) {
		probabilityDistribution[roll] = rollHistory.distribution[roll] / rollHistory.count;
	}
	return probabilityDistribution;
}

interface Props {
	rollHistory: RollHistory;
}

export const RollHistoryWithDistribution: FC<Props> = ({ rollHistory }) => (
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
				<DistributionChart distribution={probabilityFromRollHistory(rollHistory)} />
			</div>
		</div>
	</div>
);
