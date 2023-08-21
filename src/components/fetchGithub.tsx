import type { ContributionWeek } from "@/components/Contributions/getContributions";

const logRateLimit = (response: Response) => {
	const remain = response.headers.get("x-ratelimit-remaining");
	const limit = response.headers.get("x-ratelimit-limit");
	const reset = response.headers.get("x-ratelimit-reset");
	console.log(`GitHub API rate limit: ${remain}/${limit}, reset: ${reset}`);
};

const oneDayInSec = 86400;

interface GithubResponse {
	data: {
		user: {
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: number;
					weeks: ContributionWeek[];
				};
			};
			avatarUrl: string;
			company: string;
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

/**
 * Temporarily, a single fetcher, because graphql requests are not cached
 * https://github.com/vercel/next.js/issues/49438
 */
export const fetchGithub = async (): Promise<GithubResponse> => {
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
