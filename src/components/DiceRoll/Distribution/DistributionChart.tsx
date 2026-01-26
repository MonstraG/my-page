import { useDistributionSyncContext } from "@/components/DiceRoll/Distribution/distributionSyncContext.tsx";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import type { FC } from "react";
import styles from "./DistributionChart.module.css";

const hundredPercent = 100;

function ratioToPercent(ratio: number | null): string {
	return `${((ratio ?? 0) * hundredPercent).toFixed(2)}%`;
}

interface Props {
	distribution: Record<number, number>;
	scrollSync: ScrollSync;
}

export const DistributionChart: FC<Props> = ({ distribution, scrollSync }) => {
	const max = Math.max(...Object.values(distribution));
	const distributionSyncContext = useDistributionSyncContext();

	return (
		<div className={styles.distributionHost}>
			<div className={styles.distributionContainer} {...scrollSync}>
				{Object.entries(distribution).map(([result, probability]) => (
					<Tooltip
						title={ratioToPercent(probability)}
						key={result}
						open={distributionSyncContext.value === Number(result)}
						onMouseEnter={() => {
							distributionSyncContext.setValue(Number(result));
						}}
						onMouseLeave={() => {
							distributionSyncContext.setValue(undefined);
						}}
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
