import type { NextPage } from "next";
import { Profile } from "@/components/Github/Profile/Profile";
import { Contributions } from "@/components/Github/Contributions/Contributions";
import Container from "@mui/joy/Container";
import Sheet from "@mui/joy/Sheet";

const AboutPage: NextPage = () => (
	<Container disableGutters>
		<Sheet sx={{ p: 4, pt: 4, pb: 20, my: 2 }} component="article">
			<Profile />
			<Contributions />
		</Sheet>
	</Container>
);

export default AboutPage;
