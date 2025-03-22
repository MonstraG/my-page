import { DnDSpells } from "@/components/spells/DnDSpells";
import { allSpells } from "@/components/spells/spellData/spells";
import { Container } from "@/ui/Container/Container";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "DnD spells",
};

const DndSpellsPage: NextPage = () => (
	<Container>
		<Stack gap={2}>
			<Stack direction="row" gap={1} style={{ justifyContent: "space-between" }}>
				<Stack
					direction="row"
					gap={1}
					style={{ alignItems: "end", flexWrap: "wrap", flexGrow: 1 }}
				>
					<h1>DnD spells</h1>
				</Stack>
			</Stack>

			<Paragraph>
				This includes all {allSpells.length}{" "}
				spells available in free rules of 5.5e (2024) DnD.
			</Paragraph>

			<DnDSpells />
		</Stack>
	</Container>
);

export default DndSpellsPage;
