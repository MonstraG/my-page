import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import type { Metadata, NextPage } from "next";
import { DnDSpells } from "@/app/(app)/dnd-spells/DnDSpells";

export const metadata: Metadata = {
	title: "DnD spells"
};

const DndSpellsPage: NextPage = () => (
	<Container>
		<Stack gap={3} sx={{ pt: 4, pb: 20 }}>
			<DnDSpells />
		</Stack>
	</Container>
);

export default DndSpellsPage;
