"use client";
import { type FC, useState } from "react";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { SpellsList } from "@/app/(app)/dnd-spells/SpellsList";

const DndSpellsPage: FC = () => {
	const [search, setSearch] = useState<string>("");

	return (
		<Container>
			<Stack gap={3} sx={{ pt: 4, pb: 20 }}>
				<Stack direction="row" gap={2} alignItems="end">
					<Typography level="h1" lineHeight={1}>
						DnD spells
					</Typography>

					<Input
						startDecorator={<SearchIcon />}
						placeholder="Search"
						variant="outlined"
						value={search}
						size="sm"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</Stack>

				<SpellsList search={search} />
			</Stack>
		</Container>
	);
};

export default DndSpellsPage;
