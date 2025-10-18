import { getProfile } from "@/components/Github/Profile/getProfile";
import { Avatar } from "@/ui/Avatar/Avatar";
import Image from "next/image";
import type { FC } from "react";
import styles from "./profile.module.css";
import { MyLinkOut } from "@/ui/MyLink/MyLink";

export const Profile: FC = async () => {
	const profile = await getProfile();

	const subtitle = [
		profile.company ? `Working at ${profile.company}` : "",
		profile.location ? `living in ${profile.location}` : "",
	].join(", ");

	return (
		<div className={styles.profileHeader}>
			<Avatar>
				{profile.avatarUrl && (
					<Image
						src={profile.avatarUrl}
						alt={`${profile.name}'s avatar`}
						height={48}
						width={48}
						priority
					/>
				)}
			</Avatar>
			<div className={styles.location}>
				<h1>
					<MyLinkOut href={profile.url}>{profile.name}</MyLinkOut>
				</h1>
				<span>{subtitle}</span>
			</div>
		</div>
	);
};
