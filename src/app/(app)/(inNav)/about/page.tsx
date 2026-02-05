import { Contributions } from "@/components/Github/Contributions/Contributions";
import { Profile } from "@/components/Github/Profile/Profile";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Me",
	description: "Test if my github API integration works",
};

const AboutPage: NextPage = () => (
	<ArticleContainer>
		<Profile />
		<Contributions />
	</ArticleContainer>
);

export default AboutPage;
