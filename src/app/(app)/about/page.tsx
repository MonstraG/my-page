import type { NextPage } from "next";
import { Profile } from "@/components/Github/Profile/Profile";
import { Contributions } from "@/components/Github/Contributions/Contributions";
import { Container } from "@/components/Container/Container";

const AboutPage: NextPage = () => (
	<Container>
		<Profile />
		<Contributions />
	</Container>
);

export default AboutPage;
