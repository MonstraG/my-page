import { Contributions } from "@/components/Github/Contributions/Contributions";
import { Profile } from "@/components/Github/Profile/Profile";
import { Container } from "@/ui/Container/Container";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "About (but not really)",
};

const AboutPage: NextPage = () => (
	<Container>
		<Profile />
		<Contributions />
	</Container>
);

export default AboutPage;
