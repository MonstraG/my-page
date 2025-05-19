import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

function probabilityFromRollHistory(rollHistory: RollHistory): Record<number, number> {
	const probabilityDistribution: Record<number, number> = {};
	for (const roll in rollHistory.distribution) {
		probabilityDistribution[roll] = rollHistory.distribution[roll] / rollHistory.count;
	}
	return probabilityDistribution;
}

interface Props {
	rollHistory: RollHistory;
	scrollSync: ScrollSync;
}

export const RollHistoryDistribution: FC<Props> = ({ rollHistory, scrollSync }) => (
	<Stack component="section" gap={1}>
		<h3>Distribution so far</h3>
		<DistributionChart
			distribution={probabilityFromRollHistory(rollHistory)}
			scrollSync={scrollSync}
		/>
	</Stack>
);
