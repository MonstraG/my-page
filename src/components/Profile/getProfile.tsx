import { fetchGithub } from "@/components/fetchGithub";

export interface ProfileData {
	avatarUrl: string;
	company: string;
	url: string;
	name: string;
}

export const getProfile = async (): Promise<ProfileData> =>
	await fetchGithub().then((data) => data.data.user);
