"use client";
import { type FC, useState } from "react";
import { fullDndClassSelection, MoreFilters } from "@/components/spells/MoreFilters";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { SpellsLists } from "@/components/spells/SpellsLists";
import type { SxProps } from "@mui/joy/styles/types";

const widerInput: SxProps = {
	maxWidth: "400px"
};

export const DnDSpells: FC = () => {
	const [search, setSearch] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<number[]>(fullDndClassSelection);

	return (
		<>
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
		</>
	);
};
