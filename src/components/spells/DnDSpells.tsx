import { FavoriteSpellStoreProvider } from "@/components/spells/favouriteSpellsStore";
import { MoreFilters } from "@/components/spells/Filters/MoreFilters";
import { SpellSearch } from "@/components/spells/Filters/SpellSearch";
import { SortButtons } from "@/components/spells/Sort/SortButtons";
import { SpellsLists } from "@/components/spells/SpellsLists";
import { Stack } from "@/ui/Stack/Stack";
import { type FC } from "react";

export const DnDSpells: FC = () => (
	<>
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

		<FavoriteSpellStoreProvider>
			<SpellsLists />
		</FavoriteSpellStoreProvider>
	</>
);
