import { useDistributionTooltipSyncStore } from "@/components/DiceRoll/Distribution/useDistributionTooltipSyncStore";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import type { FC } from "react";
import styles from "./DistributionChart.module.css";

function ratioToPercent(ratio: number | null): string {
	return ((ratio ?? 0) * 100).toFixed(2) + "%";
}

const handleTooltipClose = () => {
	useDistributionTooltipSyncStore.setState({ open: null });
};

interface Props {
	distribution: Record<number, number>;
	scrollSync: ScrollSync;
}

export const DistributionChart: FC<Props> = ({ distribution, scrollSync }) => {
	const max = Math.max(...Object.values(distribution));
	const { open } = useDistributionTooltipSyncStore();

	return (
		<div className={styles.distributionHost}>
			<div className={styles.distributionContainer} {...scrollSync}>
				{Object.entries(distribution).map(([result, probability]) => (
					<Tooltip
						title={ratioToPercent(probability)}
						key={result}
						open={open === Number(result)}
						onMouseEnter={() => {
							useDistributionTooltipSyncStore.setState({ open: Number(result) });
						}}
						onMouseLeave={handleTooltipClose}
					>
						<div className={styles.column}>
							<div
								className={styles.columnFilling}
								style={{ height: ratioToPercent(probability / max) }}
							>
								{result}
							</div>
						</div>
					</Tooltip>
				))}
			</div>
		</div>
	);
};
