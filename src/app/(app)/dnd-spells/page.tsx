import type { Metadata, NextPage } from "next";
import { DnDSpells } from "@/components/spells/DnDSpells";
import { Container } from "@/ui/Container/Container";
import { Stack } from "@/ui/Stack/Stack";

export const metadata: Metadata = {
	title: "DnD spells"
};

const DndSpellsPage: NextPage = () => (
	<Container>
		<Stack gap={1}>
			<DnDSpells />
		</Stack>
	</Container>
);

export default DndSpellsPage;
