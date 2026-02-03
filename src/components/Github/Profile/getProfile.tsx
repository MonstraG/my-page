import { fetchGithub } from "@/components/Github/fetchGithub";

export interface ProfileData {
	avatarUrl: string;
	company: string;
	location: string;
	url: string;
	name: string;
}

export const getProfile = (): Promise<ProfileData> => fetchGithub().then((data) => data.data.user);
