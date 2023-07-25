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

export type ContributionDay = {
	contributionCount: number;
	date: string;
};

export type ContributionWeek = {
	contributionDays: ContributionDay[];
};

type GithubContributions = {
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
};

export type Contributions = {
	maxContributions: number;
	totalContributions: number;
	weeks: ContributionWeek[];
};

export const getContributions = async (): Promise<Contributions> => {
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`
		},
		body: JSON.stringify(body)
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const data = (await res.json()) as GithubContributions;

	const { weeks, totalContributions } =
		data.data.user.contributionsCollection.contributionCalendar;
	const maxContributions = Math.max(
		...weeks.flatMap((week) => week.contributionDays.map((d) => d.contributionCount))
	);

	return {
		weeks,
		totalContributions,
		maxContributions
	};
};
