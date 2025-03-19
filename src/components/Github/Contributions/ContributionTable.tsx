import { ContributionColumn } from "@/components/Github/Contributions/ContributionColumn/ContributionColumn";
import { ContributionLabel } from "@/components/Github/Contributions/ContributionLabel/ContributionLabel";
import { ContributionsWeekColumn } from "@/components/Github/Contributions/ContributionsWeekColumn";
import type {
	ContributionDay,
	ContributionInfo,
	ContributionWeek,
} from "@/components/Github/Contributions/getContributions";
import { Sheet } from "@/ui/Sheet/Sheet";
import { type FC } from "react";
import styles from "./ContributionTable.module.css";

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
	month: "short",
});

const differentMonths = (a: Date, b: Date): boolean => a.getMonth() !== b.getMonth();

/**
 * Split array into chunks of seven items.
 * Whenever a new month is encountered, a week object receives monthLabel
 * @param array to be split
 * @param daysInFirstChunk if > 0, first chunk will be of this size, to align everything with monday
 */
function* splitIntoWeeks(
	array: ContributionDay[],
	daysInFirstChunk: number,
): Generator<ContributionWeek, undefined, undefined> {
	if (daysInFirstChunk > 0) {
		yield {
			monthLabel: undefined, // first partial week never gets labeled
			days: array.slice(0, daysInFirstChunk),
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
				days,
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
		splitIntoWeeks(contributions.days, daysInFirstChunk),
	);

	return (
		<Sheet style={{ display: "inline-block" }}>
			<div className={styles.table}>
				<ContributionColumn>
					{weekdays.map((day, index) => (
						<ContributionLabel title={day} key={index}>
							{day[0]}
						</ContributionLabel>
					))}
				</ContributionColumn>

				{weeks.map((week, index) => (
					<ContributionsWeekColumn
						key={index}
						week={week}
						maxContributions={contributions.maxContributions}
					/>
				))}
			</div>
		</Sheet>
	);
};
