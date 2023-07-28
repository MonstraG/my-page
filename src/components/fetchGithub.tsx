const logRateLimit = (response: Response) => {
	const remain = response.headers.get("x-ratelimit-remaining");
	const limit = response.headers.get("x-ratelimit-limit");
	const reset = response.headers.get("x-ratelimit-reset");
	console.log(`GitHub API rate limit: ${remain}/${limit}, reset: ${reset}`);
};

// TODO:
// PROBLEM: REQUESTS NOT CACHED.
// https://github.com/vercel/next.js/issues/49438

// POTENTIAL SOLUTION:
// SHOVE EVERYTHING INTO A SINGLE REQUEST.

export const fetchGithub = async <T,>(body: { query: string; variables?: string }): Promise<T> => {
	console.log(body.query.slice(0, 30));

	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` },
		body: JSON.stringify(body),
		next: { revalidate: 86400 } // day
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch data, status=${res.status} response=${await res.text()}`);
	}

	logRateLimit(res);

	return (await res.json()) as T;
};
