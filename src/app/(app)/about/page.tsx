import { Contributions } from "@/components/Github/Contributions/Contributions";
import { Profile } from "@/components/Github/Profile/Profile";
import type { Metadata, NextPage } from "next";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout.tsx";
import { allPages, getMetadata } from "@/components/nav/pages";

export const metadata: Metadata = getMetadata(allPages.me);

const AboutPage: NextPage = () => (
	<MainLayout path={allPages.me.title}>
		<Profile />
		<Contributions />
	</MainLayout>
);

export default AboutPage;
