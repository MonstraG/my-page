import type { FC } from "react";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { useDistributionTooltipSyncStore } from "@/components/DiceRoll/Distribution/useDistributionTooltipSyncStore";
import styles from "./DistributionChart.module.css";
import { Tooltip } from "@/ui/Tooltip/Tooltip";

function ratioToPercent(ratio: number | null): string {
	return ((ratio ?? 0) * 100).toFixed(2) + "%";
}

const handleTooltipClose = () => useDistributionTooltipSyncStore.setState({ open: null });

interface Props {
	distribution: Record<number, number>;
	scrollSync: ScrollSync;
}

export const DistributionChart: FC<Props> = ({ distribution, scrollSync }) => {
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));

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
