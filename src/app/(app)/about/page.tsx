import { Contributions } from "@/components/Github/Contributions/Contributions";
import { Profile } from "@/components/Github/Profile/Profile";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "About (but not really)",
};

const AboutPage: NextPage = () => (
	<ArticleContainer>
		<Profile />
		<Contributions />
	</ArticleContainer>
);

export default AboutPage;
