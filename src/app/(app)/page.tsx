import type { Metadata, NextPage } from "next";
import { Container } from "@/ui/Container/Container";
import { Stack } from "@/ui/Stack/Stack";
import { DiceRolling } from "@/components/DiceRoll/DiceRolling";

export const metadata: Metadata = {
	title: "Dice rolling"
};

const IndexPage: NextPage = () => (
	<Container>
		<Stack gap={4}>
			<h1>Dice rolling</h1>

			<DiceRolling />
		</Stack>
	</Container>
);

export default IndexPage;
