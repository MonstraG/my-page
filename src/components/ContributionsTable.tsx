"use client";
import { FC } from "react";
import { ContributionInfo } from "@/components/getContributions";
import { ContributionsWeekColumn } from "@/components/ContributionsWeekColumn";
import styles from "./Contributions.module.scss";

// https://stackoverflow.com/a/57102881/11593686
function getStartOfTheWeek(locale: string) {
	const parts = locale.match(
		/^([a-z]{2,3})(?:-([a-z]{3})(?=$|-))?(?:-([a-z]{4})(?=$|-))?(?:-([a-z]{2}|\d{3})(?=$|-))?/i
	);
	if (parts == null) return 0;

	const region = parts[4];

	if (region) {
		const regionSat = "AEAFBHDJDZEGIQIRJOKWLYOMQASDSY".match(/../g);
		const regionSun =
			"AGARASAUBDBRBSBTBWBZCACNCODMDOETGTGUHKHNIDILINJMJPKEKHKRLAMHMMMOMTMXMZNINPPAPEPHPKPRPTPYSASGSVTHTTTWUMUSVEVIWSYEZAZW".match(
				/../g
			);

		if (regionSun?.includes(region)) {
			return 6;
		}
		if (regionSat?.includes(region)) {
			return 5;
		}
		return 0;
	}

	const language = parts[1];
	const languageSat = ["ar", "arq", "arz", "fa"];
	const languageSun =
		"amasbndzengnguhehiidjajvkmknkolomhmlmrmtmyneomorpapssdsmsnsutatethtnurzhzu".match(/../g);

	if (languageSun?.includes(language)) {
		return 6;
	}
	if (languageSat.includes(language)) {
		return 5;
	}
	return 0;
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

type Props = {
	contributions: ContributionInfo;
};

export const ContributionsTable: FC<Props> = ({ contributions }) => {
	const startOfTheWeek = getStartOfTheWeek(
		// typeof navigator !== "undefined" ? navigator.language : "en-GB"
		"en-GB"
	);

	const offset = startOfTheWeek - (contributions.days[0].date.getDay() % 7) + 1;

	const weeks: { date: Date; contributionCount: number }[][] = Array.from(
		splitIntoWeeks(contributions.days, offset)
	);

	return (
		<div className={styles.year}>
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
