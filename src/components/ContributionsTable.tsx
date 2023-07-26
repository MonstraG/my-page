"use client";
import { FC, useEffect, useState } from "react";
import { ContributionInfo } from "@/components/getContributions";
import { ContributionsWeekColumn } from "@/components/ContributionsWeekColumn";
import styles from "./Contributions.module.scss";

/**
 * Code-golfed function to get on which day does the week start in a given locale
 * Does it by matching against all known locales/regions where it doesn't start on monday.
 * Based on https://stackoverflow.com/a/57102881/11593686
 * @param locale {string} - which locale to test
 * @returns number ISO day of the week number (1 - Monday, 7 - Sunday)
 */
export function getStartOfTheWeekISO(locale: string) {
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

/**
 * Split array into chunks of 7 items
 * @param array to be split
 * @param offset if > 0, first chunk will be of this size
 */
function* splitIntoWeeks<T>(array: T[], offset: number): Generator<T[], undefined, undefined> {
	const chunkSize = 7;

	if (offset > 0) {
		yield array.slice(0, offset);
	}

	if (offset >= array.length) return;

	for (let i = offset; i < array.length; i += chunkSize) {
		yield array.slice(i, i + chunkSize);
	}
	return;
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getWeekdays = (startOfTheWeekISO: 1 | 6 | 7) => {
	return [...weekdays.slice(startOfTheWeekISO - 1), ...weekdays.slice(0, startOfTheWeekISO - 1)];
};

type Props = {
	contributions: ContributionInfo;
};

export const ContributionsTable: FC<Props> = ({ contributions }) => {
	const [language, setLanguage] = useState<string>("en-GB");
	useEffect(() => {
		if (typeof navigator !== "undefined") {
			setLanguage(navigator.language);
		}
	}, []);

	const startOfTheWeekISO = getStartOfTheWeekISO(language);

	const offset = startOfTheWeekISO - (contributions.days[0].date.getDay() % 7);
	const weeks: { date: Date; contributionCount: number }[][] = Array.from(
		splitIntoWeeks(contributions.days, offset)
	);

	return (
		<div className={styles.year}>
			<div className={styles.column}>
				{getWeekdays(startOfTheWeekISO).map((day, index) => (
					<div key={index} className={styles.weekdayName} title={day}>
						{day[0]}
					</div>
				))}
			</div>
			{weeks.map((week, index) => (
				<ContributionsWeekColumn
					key={index}
					week={week}
					maxContributions={contributions.maxContributions}
				/>
			))}
		</div>
	);
};
