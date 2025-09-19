import type { GithubResponse } from "@/components/Github/fetchGithub";

const getRandInt = (max: number) => Math.floor(Math.random() * max);

const toISODate = (date: Date) => date.toISOString().substring(0, 10);

const newArr = (length: number): unknown[] => Array.from({ length });

const baseWeek = newArr(7);
const now = new Date();
now.setFullYear(now.getFullYear() - 1);

const weeks = Array.from({ length: 52 }).map(() => ({
	contributionDays: baseWeek.map(() => {
		now.setDate(now.getDate() + 1); // increment day;
		return {
			contributionCount: getRandInt(50),
			date: toISODate(now),
		};
	}),
}));

const totalContributions = weeks
	.flatMap((week) => week.contributionDays)
	.reduce((acc, next) => acc + next.contributionCount, 0);

export const mockGithubData: GithubResponse = {
	data: {
		user: {
			avatarUrl: "https://avatars.githubusercontent.com/u/17963791?s=48",
			company: "Lifekeys AS",
			url: "https://github.com/MonstraG",
			location: "Bergen, Norway",
			name: "Arseny Garelyshev",
			contributionsCollection: {
				contributionCalendar: {
					weeks,
					totalContributions,
				},
			},
		},
	},
};
