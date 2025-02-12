import { type FC } from "react";
import {
	ColumnContainer,
	ContributionsWeekColumn
} from "@/components/Github/Contributions/ContributionsWeekColumn";
import type {
	ContributionInfo,
	ContributionDay,
	ContributionWeek
} from "@/components/Github/Contributions/getContributions";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

const monthFormat: Intl.DateTimeFormatOptions = {
	month: "short"
};

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", monthFormat);

const differentMonths = (a: Date, b: Date): boolean => a.getMonth() !== b.getMonth();

/**
 * Split array into chunks of seven items.
 * Whenever a new month is encountered, a week object receives monthLabel
 * @param array to be split
 * @param daysInFirstChunk if > 0, first chunk will be of this size, to align everything with monday
 */
function* splitIntoWeeks(
	array: ContributionDay[],
	daysInFirstChunk: number
): Generator<ContributionWeek, undefined, undefined> {
	if (daysInFirstChunk > 0) {
		yield {
			monthLabel: undefined, // first partial week never gets labeled
			days: array.slice(0, daysInFirstChunk)
		};
	}

	if (daysInFirstChunk >= array.length) return;

	const chunkSize = 7;
	let lastWeek: ContributionDay | null = null;

	for (let i = daysInFirstChunk; i < array.length; i += chunkSize) {
		const days = array.slice(i, i + chunkSize);
		const thisWeek = days[0];
		const monthChanged = lastWeek == null || differentMonths(lastWeek.date, thisWeek.date);

		const nextWeek = array.at(i + chunkSize);
		// we need this check to avoid writing 2 overlapping labels next to each other at the start of the table,
		// when you have a dangling partial month
		const monthChangesAgainSoon = nextWeek && differentMonths(thisWeek.date, nextWeek.date);

		if (monthChangesAgainSoon) {
			yield { monthLabel: undefined, days };
		} else if (!monthChanged) {
			yield { monthLabel: undefined, days };
		} else {
			yield {
				monthLabel: dateTimeFormat.format(thisWeek.date),
				days
			};
		}

		lastWeek = thisWeek;
	}

	return;
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Props {
	contributions: ContributionInfo;
}

export const ContributionTable: FC<Props> = ({ contributions }) => {
	const startJsDay = contributions.days[0].date.getDay();
	const daysInFirstChunk = Math.abs(startJsDay - 8) % 7;

	const weeks: ContributionWeek[] = Array.from(
		splitIntoWeeks(contributions.days, daysInFirstChunk)
	);

	return (
		<>
			<Sheet variant="outlined" sx={{ borderRadius: 12, display: "inline-block" }}>
				<Stack direction="row" spacing={0.5} sx={{ p: 2 }}>
					<ColumnContainer>
						{weekdays.map((day, index) => (
							<Typography
								level="body-xs"
								title={day}
								key={index}
								sx={{ lineHeight: 1 }}
							>
								{day[0]}
							</Typography>
						))}
					</ColumnContainer>

					{weeks.map((week, index) => (
						<ContributionsWeekColumn
							key={index}
							week={week}
							maxContributions={contributions.maxContributions}
						/>
					))}
				</Stack>
			</Sheet>
		</>
	);
};
