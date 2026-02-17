import { DnDSpells } from "@/components/spells/DnDSpells";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { MyLinkOut } from "@/ui/MyLink/MyLink";
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
					This includes all spells available in free rules of 5.5e (2024) DnD and Player's
					Handbook.
				</Paragraph>
				<Paragraph>
					Didn't find a specific spell? Maybe it's from one of the non-core books, try
					looking in <MyLinkOut href="https://5e.tools/spells.html">5e.tools</MyLinkOut>.
				</Paragraph>
			</Stack>

			<DnDSpells />
		</Stack>
	</ArticleContainer>
);

export default DndSpellsPage;
