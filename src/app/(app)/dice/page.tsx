import { DiceRolling } from "@/components/DiceRoll/DiceRolling";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Dice rolling",
};

const DicePage: NextPage = () => (
	<ArticleContainer>
		<Stack gap={4}>
			<h1>Dice rolling</h1>

			<DiceRolling />
		</Stack>
	</ArticleContainer>
);

export default DicePage;
