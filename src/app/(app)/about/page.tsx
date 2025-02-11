import type { Metadata, NextPage } from "next";
import { Profile } from "@/components/Github/Profile/Profile";
import { Contributions } from "@/components/Github/Contributions/Contributions";
import { Container } from "@/ui/Container/Container";

export const metadata: Metadata = {
	title: "About (but not really)"
};

const AboutPage: NextPage = () => (
	<Container>
		<Profile />
		<Contributions />
	</Container>
);

export default AboutPage;
