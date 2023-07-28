import type { FC } from "react";
import { getProfile } from "@/components/Profile/getProfile";
import Image from "next/image";
import styles from "./Profile.module.scss";
import { LinkOut } from "@/app/LinkOut";

export const Profile: FC = async () => {
	const profile = await getProfile();

	return (
		<div className={styles.profile}>
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
				<h1>
					<LinkOut href={profile.url}>{profile.name}</LinkOut>
				</h1>
				{profile.company && <span>Working at {profile.company}</span>}
			</div>
		</div>
	);
};
