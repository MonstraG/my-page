import { ContributionColumn } from "@/components/Github/Contributions/ContributionColumn/ContributionColumn";
import { ContributionLabel } from "@/components/Github/Contributions/ContributionLabel/ContributionLabel";
import type {
	ContributionDay,
	ContributionWeek,
} from "@/components/Github/Contributions/getContributions";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import type { FC } from "react";

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "numeric",
	year: "numeric",
});

function getTooltipText(day: ContributionDay): string {
	const date = dateTimeFormat.format(day.date);

	if (day.contributionCount === 0) {
		return `There were no contributions made on ${date}`;
	}
	if (day.contributionCount === 1) {
		return `There was one contribution made on ${date}`;
	}
	return `There were ${day.contributionCount} contributions made on ${date}`;
}

interface Props {
	week: ContributionWeek;
	maxContributions: number;
}

export const ContributionsWeekColumn: FC<Props> = ({ week, maxContributions }) => (
	<ContributionColumn>
		{/* explicit width and height on the label to maintain alignment */}
		<ContributionLabel>{week.monthLabel}</ContributionLabel>
		{week.days.map((day) => (
			<Tooltip title={getTooltipText(day)} key={day.date.valueOf()} arrow>
				<Sheet
					style={{
						padding: 0,
						height: "12px",
						width: "12px",
						borderRadius: 3,
						background: `rgba(0, 255, 0, ${day.contributionCount / maxContributions})`,
					}}
				/>
			</Tooltip>
		))}
	</ContributionColumn>
);
