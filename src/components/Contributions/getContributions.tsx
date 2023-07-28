import { fetchGithub } from "@/components/fetchGithub";

const query = `
query Contributions($userName:String!) { 
  user(login: $userName) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}`;

const variables = `
  {
    "userName": "MonstraG"
  }
`;

const body = {
	query,
	variables
};

export interface ContributionDay {
	contributionCount: number;
	date: string;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

interface GithubContributions {
	data: {
		user: {
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: number;
					weeks: ContributionWeek[];
				};
			};
		};
	};
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
	const data = await fetchGithub<GithubContributions>(body);

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
