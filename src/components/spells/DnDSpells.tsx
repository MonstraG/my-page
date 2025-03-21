"use client";
import { FavoriteSpellStoreProvider } from "@/components/spells/favouriteSpellsStore";
import { MoreFilters } from "@/components/spells/MoreFilters";
import { type DndClass, dndClasses } from "@/components/spells/spellData/spells.types";
import { SpellsLists } from "@/components/spells/SpellsLists";
import { SearchIcon } from "@/icons/SearchIcon";
import { Input } from "@/ui/Input/Input";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
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

			<Paragraph>
				This includes all 333 spells available in free rules of 5.5e (2024) DnD.
			</Paragraph>

			<FavoriteSpellStoreProvider>
				<SpellsLists search={deferredSearch} selectedClasses={deferredClassSelection} />
			</FavoriteSpellStoreProvider>
		</Stack>
	);
};
