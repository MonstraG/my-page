import type { GithubResponse } from "@/components/fetchGithub";

const getRandInt = (max: number) => Math.floor(Math.random() * max);

const toISODate = (date: Date) => date.toISOString().substring(0, 10);

const newArr = (length: number): unknown[] => Array.from({ length });

const baseWeek = newArr(7);
const date = new Date();
date.setFullYear(date.getFullYear() - 1);

const weeks = Array.from({ length: 52 }).map(() => ({
	contributionDays: baseWeek.map(() => {
		date.setDate(date.getDate() + 1); // increment day;
		return {
			contributionCount: getRandInt(50),
			date: toISODate(date)
		};
	})
}));

const totalContributions = weeks
	.flatMap((week) => week.contributionDays)
	.reduce((acc, next) => acc + next.contributionCount, 0);

export const mockGithubData: GithubResponse = {
	data: {
		user: {
			avatarUrl:
				"https://avatars.githubusercontent.com/u/17963791?s=48&u=10e0ba1839a25a8ffa116a7555f08730e0c78a0e&v=4",
			company: "Lifekeys AS",
			url: "https://github.com/MonstraG",
			name: "Arseny Garelyshev",
			contributionsCollection: {
				contributionCalendar: {
					weeks,
					totalContributions
				}
			}
		}
	}
};
