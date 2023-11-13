import type { FC } from "react";
import { getProfile } from "@/components/Github/Profile/getProfile";
import Image from "next/image";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";

export const Profile: FC = async () => {
	const profile = await getProfile();

	const subtitle = [
		profile.company ? `Working at ${profile.company}` : "",
		profile.location ? `living in ${profile.location}` : ""
	].join(", ");

	return (
		<Stack direction="row" alignItems="center" spacing={2} my={4}>
			<Avatar size="lg" variant="outlined">
				{profile.avatarUrl && (
					<Image
						src={profile.avatarUrl}
						alt={profile.name + "'s avatar"}
						height={48}
						width={48}
					/>
				)}
			</Avatar>
			<Stack direction="row" alignItems="baseline" spacing={2}>
				<Typography level="h1">
					<Link href={profile.url} rel="noopener noreferrer nofollow ugc">
						{profile.name}
					</Link>
				</Typography>
				<Typography>{subtitle}</Typography>
			</Stack>
		</Stack>
	);
};
