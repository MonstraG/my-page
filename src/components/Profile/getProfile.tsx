import { fetchGithub } from "@/components/fetchGithub";

const query = `
query Profile($userName: String!) {
  user(login: $userName) {
    avatarUrl(size: 48)
    company
    url
    name
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

interface GithubProfile {
	data: {
		user: Profile;
	};
}

export interface Profile {
	avatarUrl: string;
	company: string;
	url: string;
	name: string;
}

export const getProfile = async (): Promise<Profile> =>
	fetchGithub<GithubProfile>(body).then((data) => data.data.user);
