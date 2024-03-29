"use client";
import { type FC, useEffect, useState } from "react";
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

/**
 * Code-golfed function to get on which day does the week start in a given locale
 * Does it by matching against all known locales/regions where it doesn't start on monday.
 * Based on https://stackoverflow.com/a/57102881/11593686
 * @param locale {string} - which locale to test
 * @returns number ISO day of the week number (1 - Monday, 7 - Sunday)
 */
function getStartOfTheWeekISO(locale: string) {
	const parts = locale.match(
		/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i
	);
	if (parts == null) return 1;

	const region = parts[4];

	if (region) {
		const regionSat = "AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g);
		const regionSun =
			"AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(
				/../g
			);

		if (regionSun?.includes(region)) {
			return 7;
		}
		if (regionSat?.includes(region)) {
			return 6;
		}
		return 1;
	}

	const language = parts[1];
	const languageSat = ["ar", "arq", "arz", "fa"];
	const languageSun =
		"amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);

	if (languageSun?.includes(language)) {
		return 7;
	}
	if (languageSat.includes(language)) {
		return 6;
	}
	return 1;
}

const differentMonths = (a: Date, b: Date): boolean => a.getMonth() !== b.getMonth();

/**
 * Split array into chunks of seven items.
 * Whenever a new month is encountered, a week object receives monthLabel
 * @param array to be split
 * @param offset if > 0, first chunk will be of this size
 * @param language to use for month-start label indicator
 */
function* splitIntoWeeks(
	array: ContributionDay[],
	offset: number,
	language: string
): Generator<ContributionWeek, undefined, undefined> {
	if (offset > 0) {
		// partial week never gets labeled
		yield { days: array.slice(0, offset) };
	}

	if (offset >= array.length) return;

	const chunkSize = 7;
	let lastWeek: ContributionDay | null = null;

	for (let i = offset; i < array.length; i += chunkSize) {
		const days = array.slice(i, i + chunkSize);
		const thisWeek = days[0];
		const monthChanged = lastWeek == null || differentMonths(lastWeek.date, thisWeek.date);

		const nextWeek = array.at(i + chunkSize);
		// we need this check to avoid writing 2 overlapping labels next each other in some cases
		const monthChangesAgain = nextWeek && differentMonths(thisWeek.date, nextWeek.date);

		if (monthChanged && !monthChangesAgain) {
			yield {
				monthLabel: thisWeek.date.toLocaleString(language, { month: "short" }),
				days
			};
			lastWeek = thisWeek;
		} else {
			yield { days };
		}
	}

	return;
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getWeekdays = (startOfTheWeekISO: 1 | 6 | 7) => {
	return [...weekdays.slice(startOfTheWeekISO - 1), ...weekdays.slice(0, startOfTheWeekISO - 1)];
};

interface Props {
	contributions: ContributionInfo;
}

export const ContributionTable: FC<Props> = ({ contributions }) => {
	const [language, setLanguage] = useState<string>("en-GB");
	useEffect(() => {
		if (typeof navigator !== "undefined") {
			setLanguage(navigator.language);
		}
	}, []);

	const startOfTheWeekISO = getStartOfTheWeekISO(language);

	const offset = Math.abs(startOfTheWeekISO - (contributions.days[0].date.getDay() % 7)) % 7;

	const weeks: ContributionWeek[] = Array.from(
		splitIntoWeeks(contributions.days, offset, language)
	);

	return (
		<>
			<Sheet variant="outlined" sx={{ borderRadius: 12, display: "inline-block" }}>
				<Stack direction="row" spacing={0.5} sx={{ p: 2 }}>
					<ColumnContainer>
						{getWeekdays(startOfTheWeekISO).map((day, index) => (
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
							language={language}
						/>
					))}
				</Stack>
			</Sheet>
		</>
	);
};
