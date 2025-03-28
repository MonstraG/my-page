"use client";
import { FavoriteSpellStoreProvider } from "@/components/spells/favouriteSpellsStore";
import { MoreFilters } from "@/components/spells/Filters/MoreFilters";
import { getSortDirectionIcon, type Sort, useSort } from "@/components/spells/Sort";
import {
	type DndClass,
	dndClasses,
	type DndSchool,
	dndSchools,
	type DndTag,
	searchableDndTags,
	type Spell,
} from "@/components/spells/spellData/spells.types";
import { SpellsLists } from "@/components/spells/SpellsLists";
import { SearchIcon } from "@/icons/material/SearchIcon";
import { Button } from "@/ui/Button/Button";
import { Input } from "@/ui/Input/Input";
import { Stack } from "@/ui/Stack/Stack";
import { type ChangeEvent, type FC, useCallback, useDeferredValue, useState } from "react";

const initialSort: Sort<Spell> = { col: "name", dir: "asc" };

export const DnDSpells: FC = () => {
	const [search, setSearch] = useState<string>("");
	const [selectedClasses, setSelectedClasses] = useState<readonly DndClass[]>(dndClasses);
	const [selectedSchools, setSelectedSchools] = useState<readonly DndSchool[]>(dndSchools);
	const [selectedTags, setSelectedTags] = useState<readonly DndTag[]>(searchableDndTags);
	const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	const deferredSearch = useDeferredValue(search);
	const deferredClassSelection = useDeferredValue(selectedClasses);
	const deferredSchoolSelection = useDeferredValue(selectedSchools);
	const deferredTagSelection = useDeferredValue(selectedTags);

	const { sort, onSortChange } = useSort(initialSort);

	return (
		<>
			<Stack
				component="section"
				direction="row"
				style={{ justifyContent: "space-between", flexWrap: "wrap" }}
				gap={1}
			>
				<Stack direction="row" gap={1} style={{ flexWrap: "wrap" }}>
					<Button
						endDecorator={getSortDirectionIcon("name", sort)}
						active={sort.col == "name"}
						onClick={() => onSortChange("name")}
					>
						Sort by name
					</Button>
					<Button
						endDecorator={getSortDirectionIcon("level", sort)}
						active={sort.col == "level"}
						onClick={() => onSortChange("level")}
					>
						Sort by level
					</Button>
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
					selectedSchools={selectedSchools}
					setSelectedSchools={setSelectedSchools}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
				/>
			</Stack>

			<FavoriteSpellStoreProvider>
				<SpellsLists
					search={deferredSearch}
					selectedClasses={deferredClassSelection}
					selectedSchools={deferredSchoolSelection}
					selectedTags={deferredTagSelection}
					sort={sort}
				/>
			</FavoriteSpellStoreProvider>
		</>
	);
};
