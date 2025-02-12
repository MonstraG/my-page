import type { Metadata, NextPage } from "next";
import { DnDSpells } from "@/components/spells/DnDSpells";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";

export const metadata: Metadata = {
	title: "DnD spells"
};

const DndSpellsPage: NextPage = () => (
	<Container>
		<Stack gap={3}>
			<DnDSpells />
		</Stack>
	</Container>
);

export default DndSpellsPage;
