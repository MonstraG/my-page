import type { NextPage } from "next";
import { DiceRolling } from "@/components/DiceRoll/DiceRolling";
import { Container } from "@/components/Container/Container";

const DicePage: NextPage = () => (
	<Container>
		<DiceRolling />
	</Container>
);

export default DicePage;
