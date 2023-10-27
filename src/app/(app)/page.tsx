import type { NextPage } from "next";
import { DiceRolling } from "@/components/DiceRoll/DiceRolling";
import { Container } from "@mui/joy";

const IndexPage: NextPage = () => (
	<Container>
		<DiceRolling />
	</Container>
);

export default IndexPage;
