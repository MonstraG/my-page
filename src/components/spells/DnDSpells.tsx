import { MoreFilters } from "@/components/spells/Filters/MoreFilters";
import { SpellSearch } from "@/components/spells/Filters/SpellSearch";
import { SortButtons } from "@/components/spells/Sort/SortButtons";
import { SpellsLists } from "@/components/spells/SpellsLists";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";
import { SpellSortContextProvider } from "@/components/spells/Sort/SpellSortContext";
import { DndFiltersContextProvider } from "@/components/spells/Filters/useDndFilterStore.ts";

export const DnDSpells: FC = () => (
	<SpellSortContextProvider>
		<DndFiltersContextProvider>
			<Stack
				component="section"
				direction="row"
				style={{ justifyContent: "space-between", flexWrap: "wrap" }}
				gap={1}
			>
				<Stack direction="row" gap={1} style={{ flexWrap: "wrap" }}>
					<SortButtons />
					<SpellSearch />
				</Stack>

				<MoreFilters />
			</Stack>

			<SpellsLists />
		</DndFiltersContextProvider>
	</SpellSortContextProvider>
);
