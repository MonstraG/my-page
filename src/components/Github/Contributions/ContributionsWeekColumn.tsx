import type { FC } from "react";
import type { ContributionWeekParsed } from "@/components/Github/Contributions/getContributions";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import type { ContributionDayParsed } from "@/components/Github/Contributions/getContributions";

export const ColumnContainer = styled("div")`
	display: flex;
	flex-direction: column;
	gap: 4px;
	justify-content: flex-end;

	:last-of-type {
		justify-content: flex-start;
	}
`;

const formatDate: Intl.DateTimeFormatOptions = {
	day: "numeric",
	month: "numeric",
	year: "numeric"
};

function getTooltipText(day: ContributionDayParsed, language: string): string {
	const date = day.date.toLocaleString(language, formatDate);

	if (day.contributionCount === 0) {
		return `There were no contributions made on ${date}`;
	}
	if (day.contributionCount === 1) {
		return `There was one contribution made on ${date}`;
	}
	return `There were ${day.contributionCount} contributions made on ${date}`;
}

interface Props {
	week: ContributionWeekParsed;
	maxContributions: number;
	language: string;
}

export const ContributionsWeekColumn: FC<Props> = ({ week, maxContributions, language }) => (
	<ColumnContainer>
		{/* explicit width and height on the label to maintain alignment */}
		<Typography
			level="body-xs"
			lineHeight={1}
			sx={{ display: "flex", width: "12px", height: "12px" }}
		>
			{week.monthLabel}
		</Typography>
		{week.days.map((day) => (
			<Tooltip title={getTooltipText(day, language)} key={day.date.valueOf()} arrow size="sm">
				<Sheet
					variant="outlined"
					sx={{
						height: "12px",
						width: "12px",
						borderRadius: 3
					}}
					style={{
						background: `rgba(0, 255, 0, ${day.contributionCount / maxContributions})`
					}}
				/>
			</Tooltip>
		))}
	</ColumnContainer>
);
