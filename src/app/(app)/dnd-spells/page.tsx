"use client";
import { type FC, useState } from "react";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { SpellsLists } from "@/app/(app)/dnd-spells/SpellsLists";
import type { SxProps } from "@mui/joy/styles/types";
import { fullDndClassSelection, MoreFilters } from "@/app/(app)/dnd-spells/MoreFilters";

const widerInput: SxProps = {
	maxWidth: "400px"
};

const DndSpellsPage: FC = () => {
	const [search, setSearch] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<number[]>(fullDndClassSelection);

	return (
		<Container>
			<Stack gap={3} sx={{ pt: 4, pb: 20 }}>
				<Stack direction="row" gap={2} justifyContent="space-between">
					<Stack direction="row" gap={2} alignItems="end" flexWrap="wrap" flexGrow={1}>
						<Typography level="h1" lineHeight={1}>
							DnD spells
						</Typography>

						<Input
							startDecorator={<SearchIcon />}
							placeholder="Search"
							variant="outlined"
							value={search}
							fullWidth
							sx={widerInput}
							size="sm"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</Stack>

					<MoreFilters
						selectedClasses={selectedClasses}
						setSelectedClasses={setSelectedClasses}
					/>
				</Stack>

				<SpellsLists search={search} selectedClasses={selectedClasses} />
			</Stack>
		</Container>
	);
};

export default DndSpellsPage;
