import type { ContributionWeekDTO } from "@/components/Github/Contributions/getContributions";
import { mockGithubData } from "@/components/Github/mockGithubData";

const logRateLimit = (response: Response) => {
	const remaining = response.headers.get("x-ratelimit-remaining");
	const limit = response.headers.get("x-ratelimit-limit");
	const reset = response.headers.get("x-ratelimit-reset");
	if (remaining == null || limit == null || reset == null) {
		console.warn("Can't get reset time: ratelimit headers aren't set", {
			remain: remaining,
			limit,
			resetTimestamp: reset,
		});
		return;
	}

	const unixSeconds = parseInt(reset, 10);
	if (Number.isNaN(unixSeconds)) {
		console.warn("Can't get reset time: failed to parseInt the timestamp", reset);
		return;
	}

	const unixMilliseconds = unixSeconds * 1000;
	const date = new Date(unixMilliseconds);
	if (Number.isNaN(date.valueOf())) {
		console.warn(
			"Can't get reset time: new Date() returned NaN date for input",
			unixMilliseconds,
		);
		return;
	}

	const resetDateTime = date.toISOString();
	console.debug(`GitHub API rate limit: ${remaining}/${limit}, reset: ${resetDateTime}`);
};

export interface GithubResponse {
	data: {
		user: {
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: number;
					weeks: readonly ContributionWeekDTO[];
				};
			};
			avatarUrl: string;
			company: string;
			location: string;
			url: string;
			name: string;
		};
	};
}

const query = `
query Contributions($userName:String!) { 
  user(login: $userName) {
  	avatarUrl(size: 48)
    company
    url
    location
    name
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
	variables,
};

const useMockData = process.env.NODE_ENV !== "production";

export const fetchGithub = async (): Promise<GithubResponse> => {
	if (useMockData) {
		return mockGithubData;
	}

	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` },
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		throw new Error(
			`Failed to fetch data, status=${response.status} response=${await response.text()}`,
		);
	}

	logRateLimit(response);

	return (await response.json()) as GithubResponse;
};
