const query = `
query($userName:String!) { 
  user(login: $userName){
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

export interface ContributionInfo {
	maxContributions: number;
	totalContributions: number;
	days: ContributionDayParsed[];
}

export const getContributions = async (): Promise<ContributionInfo> => {
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`
		},
		body: JSON.stringify(body),
		next: { revalidate: 86400 } // day
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const data = (await res.json()) as GithubContributions;

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
