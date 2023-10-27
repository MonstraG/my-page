import type { FC } from "react";
import { getProfile } from "@/components/Github/Profile/getProfile";
import Image from "next/image";
import styles from "@/components/Github/Profile/Profile.module.scss";
import { Link, Stack, Typography } from "@mui/joy";

export const Profile: FC = async () => {
	const profile = await getProfile();

	return (
		<Stack direction="row" alignItems="center" spacing={2} my={4}>
			{profile.avatarUrl && (
				<Image
					src={profile.avatarUrl}
					alt={profile.name + "'s avatar"}
					height={48}
					width={48}
					className={styles.avatar}
				/>
			)}
			<div className={styles.nameAndSubtitle}>
				<Typography level="h1">
					<Link href={profile.url}>{profile.name}</Link>
				</Typography>
				{profile.company && <span>Working at {profile.company}</span>}
			</div>
		</Stack>
	);
};
