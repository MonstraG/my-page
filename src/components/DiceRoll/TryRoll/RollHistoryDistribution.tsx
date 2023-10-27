import type { FC } from "react";
import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { Stack, Typography } from "@mui/joy";

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
		<Typography level="h3">Distribution so far</Typography>
		<DistributionChart distribution={probabilityFromRollHistory(rollHistory)} />
	</Stack>
);
