import { fetchGithub } from "@/components/fetchGithub";

export interface ContributionDay {
	contributionCount: number;
	date: string;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export interface ContributionDayParsed {
	contributionCount: number;
	date: Date;
}

export interface ContributionWeekParsed {
	monthLabel?: string;
	days: ContributionDayParsed[];
}

export interface ContributionInfo {
	maxContributions: number;
	totalContributions: number;
	days: ContributionDayParsed[];
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
		maxContributions
	};
};
