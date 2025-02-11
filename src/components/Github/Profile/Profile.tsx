import type { FC } from "react";
import { getProfile } from "@/components/Github/Profile/getProfile";
import Image from "next/image";
import styles from "./profile.module.css";
import { Avatar } from "@/ui/Avatar/Avatar";
import { MyLink } from "@/ui/MyLink/MyLink";

export const Profile: FC = async () => {
	const profile = await getProfile();

	const subtitle = [
		profile.company ? `Working at ${profile.company}` : "",
		profile.location ? `living in ${profile.location}` : ""
	].join(", ");

	return (
		<div className={styles.profileHeader}>
			<Avatar>
				{profile.avatarUrl && (
					<Image
						src={profile.avatarUrl}
						alt={profile.name + "'s avatar"}
						height={48}
						width={48}
					/>
				)}
			</Avatar>
			<div className={styles.location}>
				<h1>
					<MyLink href={profile.url} rel="noopener noreferrer nofollow ugc">
						{profile.name}
					</MyLink>
				</h1>
				<span>{subtitle}</span>
			</div>
		</div>
	);
};
