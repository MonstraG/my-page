import type { FC } from "react";
import styles from "@/components/DiceRoll/TryRoll/TryRoll.module.scss";
import { DistributionChart } from "@/components/DiceRoll/DistributionChart";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { Stack } from "@mui/joy";

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

export const RollHistoryDistribution: FC<Props> = ({ rollHistory }) => (
	<Stack spacing={2}>
		<h3 className={styles.m0}>Distribution so far</h3>
		<DistributionChart distribution={probabilityFromRollHistory(rollHistory)} />
	</Stack>
);
