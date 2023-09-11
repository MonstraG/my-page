import type { MouseEvent, FC } from "react";
import type { ContributionDayParsed } from "@/components/Github/Contributions/getContributions";
import styles from "@/components/Github/Contributions/Contributions.module.scss";
import type { TooltipControls } from "@/components/Tooltip/useTooltipController";
import type { ContributionWeekParsed } from "@/components/Github/Contributions/getContributions";

interface Props {
	week: ContributionWeekParsed;
	maxContributions: number;
	tooltipControls: TooltipControls<ContributionDayParsed>;
}

export const ContributionsWeekColumn: FC<Props> = ({ week, maxContributions, tooltipControls }) => (
	<div className={styles.column}>
		<div className={styles.monthName}>{week.monthLabel}</div>
		{week.days.map((day, index) => (
			<div
				key={index}
				className={styles.day}
				style={{
					background: `rgba(0, 255, 0, ${day.contributionCount / maxContributions})`
				}}
				onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
					tooltipControls.open(event.currentTarget, day);
				}}
				onMouseLeave={tooltipControls.close}
			/>
		))}
	</div>
);
