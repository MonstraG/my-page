import { fetchGithub } from "@/components/Github/fetchGithub";

export interface ProfileData {
	avatarUrl: string;
	company: string;
	location: string;
	url: string;
	name: string;
}

export const getProfile = async (): Promise<ProfileData> =>
	await fetchGithub().then((data) => data.data.user);
