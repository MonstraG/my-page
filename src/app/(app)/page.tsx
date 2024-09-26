import type { Metadata, NextPage } from "next";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { DiceRolling } from "@/components/DiceRoll/DiceRolling";

export const metadata: Metadata = {
	title: "Dice rolling"
};

const IndexPage: NextPage = () => (
	<Container maxWidth="lg">
		<Stack spacing={4} component="article" sx={{ pt: 4, pb: 20 }}>
			<Typography level="h1">Dice rolling</Typography>

			<DiceRolling />
		</Stack>
	</Container>
);

export default IndexPage;
