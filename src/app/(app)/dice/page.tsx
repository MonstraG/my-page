import { DiceRolling } from "@/components/DiceRoll/DiceRolling";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";
import { allPages, getMetadata } from "@/components/nav/pages";

export const metadata: Metadata = getMetadata(allPages.diceRolling);

const DicePage: NextPage = () => (
	<MainLayout path={allPages.diceRolling.title}>
		<Stack gap={4}>
			<DiceRolling />
		</Stack>
	</MainLayout>
);

export default DicePage;
