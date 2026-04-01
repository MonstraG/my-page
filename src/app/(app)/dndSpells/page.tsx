import { DnDSpells } from "@/components/spells/DnDSpells";
import { MyLinkOut } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";
import { allPages, getMetadata } from "@/components/nav/pages";

export const metadata: Metadata = getMetadata(allPages.dndSpells);

const DndSpellsPage: NextPage = () => (
	<MainLayout path={allPages.dndSpells.title}>
		<Stack gap={2}>
			<Stack gap={1} component="section">
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
	</MainLayout>
);

export default DndSpellsPage;
