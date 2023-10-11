import { FC, MouseEvent } from "react";
import styles from "@/components/DiceRoll/Distribution.module.scss";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useTooltipController } from "@/components/Tooltip/useTooltipController";

interface Props {
	distribution: Record<number, number>;
}

export const DistributionChart: FC<Props> = ({ distribution }) => {
	const tooltip = useTooltipController<number>();
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));

	return (
		<div className={styles.distributionContainer}>
			{Object.entries(distribution).map(([result, probability]) => (
				<div
					key={result}
					className={styles.columnHost}
					onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
						tooltip.controls.open(event.currentTarget, probability);
					}}
					onMouseLeave={tooltip.controls.close}
				>
					<div className={styles.columnOutline}>
						<div
							className={styles.column}
							style={{ height: (probability / max) * 100 + "%" }}
						>
							{result}
						</div>
					</div>
				</div>
			))}

			<Tooltip tooltip={tooltip}>{((tooltip.context ?? 0) * 100).toFixed(2) + "%"}</Tooltip>
		</div>
	);
};
