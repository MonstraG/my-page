import { fetchGithub } from "@/components/Github/fetchGithub";

export interface ContributionDayDTO {
	contributionCount: number;
	date: string;
}

export interface ContributionWeekDTO {
	contributionDays: readonly ContributionDayDTO[];
}

export interface ContributionDay {
	contributionCount: number;
	date: Date;
}

export interface ContributionWeek {
	monthLabel: string | undefined;
	days: readonly ContributionDay[];
}

export interface ContributionInfo {
	maxContributions: number;
	totalContributions: number;
	days: readonly ContributionDay[];
}

export const getContributions = async (): Promise<ContributionInfo> => {
	const data = await fetchGithub();

	const { weeks, totalContributions } =
		data.data.user.contributionsCollection.contributionCalendar;
	const days = weeks
		.flatMap((week) => week.contributionDays)
		.map((d) => ({ ...d, date: new Date(d.date) }));

	const maxContributions = Math.max(...days.map((d) => d.contributionCount));

	return {
		days,
		totalContributions,
		maxContributions,
	};
};
