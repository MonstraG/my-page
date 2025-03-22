"use client";
import { FavoriteSpellStoreProvider } from "@/components/spells/favouriteSpellsStore";
import { MoreFilters } from "@/components/spells/MoreFilters";
import { type DndClass, dndClasses } from "@/components/spells/spellData/spells.types";
import { SpellsLists } from "@/components/spells/SpellsLists";
import { SearchIcon } from "@/icons/SearchIcon";
import { Input } from "@/ui/Input/Input";
import { Stack } from "@/ui/Stack/Stack";
import { type ChangeEvent, type FC, useCallback, useDeferredValue, useState } from "react";

export const DnDSpells: FC = () => {
	const [search, setSearch] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<readonly DndClass[]>(dndClasses);
	const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	const deferredSearch = useDeferredValue(search);
	const deferredClassSelection = useDeferredValue(selectedClasses);

	return (
		<>
			<Stack direction="row" style={{ justifyContent: "space-between" }} gap={1}>
				<Stack direction="row" gap={1}>
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
				<SpellsLists search={deferredSearch} selectedClasses={deferredClassSelection} />
			</FavoriteSpellStoreProvider>
		</>
	);
};
