import type { Dispatch, FC, SetStateAction } from "react";
import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import type { RollHistory } from "@/components/DiceRoll/TryRoll/TryRoll.types";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";

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
	openTooltip: number | null;
	setOpenTooltip: Dispatch<SetStateAction<number | null>>;
}

export const RollHistoryDistribution: FC<Props> = ({
	rollHistory,
	scrollSync,
	openTooltip,
	setOpenTooltip
}) => (
	<Stack spacing={2}>
		<Typography level="h3">Distribution so far</Typography>
		<DistributionChart
			distribution={probabilityFromRollHistory(rollHistory)}
			scrollSync={scrollSync}
			openTooltip={openTooltip}
			setOpenTooltip={setOpenTooltip}
		/>
	</Stack>
);
