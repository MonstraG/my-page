import type { ContributionWeekDTO } from "@/components/Github/Contributions/getContributions";
import { mockGithubData } from "@/components/Github/mockGithubData";

const logRateLimit = (response: Response) => {
	const remain = response.headers.get("x-ratelimit-remaining");
	const limit = response.headers.get("x-ratelimit-limit");
	const resetTimestamp = response.headers.get("x-ratelimit-reset");
	const resetTime = (() => {
		if (resetTimestamp == null) {
			console.warn("Can't get reset time: x-ratelimit-reset header was null");
			return null;
		}

		const unixSeconds = parseInt(resetTimestamp);
		if (isNaN(unixSeconds)) {
			console.warn("Can't get reset time: failed to parseInt the timestamp", resetTimestamp);
			return null;
		}

		const unixMilliseconds = unixSeconds * 1000;
		const date = new Date(unixMilliseconds);
		if (isNaN(date.valueOf())) {
			console.warn(
				"Can't get reset time: new Date() returned NaN date for input",
				unixMilliseconds
			);
			return null;
		}

		return date.toISOString();
	})();

	console.log(`GitHub API rate limit: ${remain}/${limit}, reset: ${resetTime}`);
};

const oneDayInSec = 86400;

export interface GithubResponse {
	data: {
		user: {
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: number;
					weeks: ContributionWeekDTO[];
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
	variables
};

const useMockData = process.env.NODE_ENV !== "production";

export const fetchGithub = async (): Promise<GithubResponse> => {
	if (useMockData) {
		return mockGithubData;
	}

	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` },
		body: JSON.stringify(body),
		next: { revalidate: oneDayInSec }
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch data, status=${res.status} response=${await res.text()}`);
	}

	logRateLimit(res);

	return (await res.json()) as GithubResponse;
};
