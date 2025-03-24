import { DnDSpells } from "@/components/spells/DnDSpells";
import { allSpells } from "@/components/spells/spellData/spells";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "DnD spells",
	description: "Browse all spells without page loads",
};

const DndSpellsPage: NextPage = () => (
	<ArticleContainer>
		<Stack gap={2}>
			<Stack gap={1} component="section">
				<h1>DnD spells</h1>

				<Paragraph>
					This includes all {allSpells.length}{" "}
					spells available in free rules of 5.5e (2024) DnD.
				</Paragraph>
			</Stack>

			<DnDSpells />
		</Stack>
	</ArticleContainer>
);

export default DndSpellsPage;
