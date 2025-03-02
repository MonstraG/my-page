"use client";
import { type ChangeEvent, type FC, useCallback, useState } from "react";
import { fullDndClassSelection, MoreFilters } from "@/components/spells/MoreFilters";
import SearchIcon from "@mui/icons-material/Search";
import { SpellsLists } from "@/components/spells/SpellsLists";
import { Stack } from "@/ui/Stack/Stack";
import { Input } from "@/ui/Input/Input";
import { useDebounceState } from "@/components/useDebounceState";
import { FavoriteSpellStoreProvider } from "@/components/spells/favouriteSpellsStore";

export const DnDSpells: FC = () => {
	const [search, setSearch] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<number[]>(fullDndClassSelection);
	const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	const debouncedSearch = useDebounceState(search, 150);

	return (
		<Stack gap={2}>
			<Stack direction="row" gap={1} style={{ justifyContent: "space-between" }}>
				<Stack
					direction="row"
					gap={1}
					style={{ alignItems: "end", flexWrap: "wrap", flexGrow: 1 }}
				>
					<h1 style={{ lineHeight: 1 }}>DnD spells</h1>

					<Input
						startDecorator={<SearchIcon />}
						placeholder="Search"
						value={search}
						onChange={handleSearchChange}
					/>
				</Stack>

				<MoreFilters
					selectedClasses={selectedClasses}
					setSelectedClasses={setSelectedClasses}
				/>
			</Stack>

			<FavoriteSpellStoreProvider>
				<SpellsLists search={debouncedSearch} selectedClasses={selectedClasses} />
			</FavoriteSpellStoreProvider>
		</Stack>
	);
};
