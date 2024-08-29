import type { Metadata, NextPage } from "next";
import { Profile } from "@/components/Github/Profile/Profile";
import { Contributions } from "@/components/Github/Contributions/Contributions";
import Container from "@mui/joy/Container";
import Box from "@mui/joy/Box";

export const metadata: Metadata = {
	title: "About (but not really)"
};

const AboutPage: NextPage = () => (
	<Container disableGutters>
		<Box sx={{ p: 4, pt: 4, pb: 20, my: 2 }} component="article">
			<Profile />
			<Contributions />
		</Box>
	</Container>
);

export default AboutPage;
