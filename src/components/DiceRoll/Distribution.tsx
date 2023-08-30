import type { FC } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { useTooltipController } from "@/components/Tooltip/useTooltipController";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { MouseEvent } from "react";

function getDistribution(dices: number, sides: number): Record<number, number> {
	let distribution: Record<number, number> = {};
	// init for a single die
	for (let i = 1; i <= sides; i++) {
		distribution[i] = 1 / sides;
	}

	for (let dice = 2; dice <= dices; dice++) {
		const newDistribution: Record<number, number> = {};
		for (let sum = dice; sum <= dice * sides; sum++) {
			newDistribution[sum] = 0;
			//  find all the ways to get a target sum
			for (let roll = 1; roll <= sides; roll++) {
				if (distribution[sum - roll]) {
					newDistribution[sum] += distribution[sum - roll] / sides;
				}
			}
		}
		distribution = newDistribution;
	}

	return distribution;
}

interface Props {
	dices: number;
	sides: number;
}

export const Distribution: FC<Props> = ({ dices, sides }) => {
	const canCalcDistribution =
		Number.isInteger(dices) &&
		dices >= 1 &&
		dices <= 10 &&
		Number.isInteger(sides) &&
		sides >= 1 &&
		sides <= 10;

	const tooltip = useTooltipController<number>();

	if (!canCalcDistribution) return null;

	const distribution = getDistribution(dices, sides);
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));

	return (
		<>
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
		</>
	);
};
