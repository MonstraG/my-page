import { DnDSpells } from "@/components/spells/DnDSpells";
import { allSpells } from "@/components/spells/spellData/spells";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { MyLink } from "@/ui/MyLink/MyLink";
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
				<Paragraph>
					Didn't find a specific spell? Maybe it's from one of the non-core books, try
					looking in{" "}
					<MyLink href="https://www.dndbeyond.com/spells" target="_blank">
						dndbeyond
					</MyLink>.
				</Paragraph>
			</Stack>

			<DnDSpells />
		</Stack>
	</ArticleContainer>
);

export default DndSpellsPage;
