"use client";
import { useFavoriteSpellsStore } from "@/components/spells/favouriteSpellsStore";
import { performSort } from "@/components/spells/Sort/Sort";
import { useDndSortStore } from "@/components/spells/Sort/useDndSortStore";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { SpellDialog } from "@/components/spells/SpellDialog/SpellDialog";
import { SpellList } from "@/components/spells/SpellList";
import { useFilteredSpells } from "@/components/spells/useFilteredSpells";
import { useDialogControl } from "@/ui/Dialog/useDialogControl";
import { Divider } from "@/ui/Divider/Divider";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, memo, useMemo } from "react";

function fork<T>(
	array: readonly T[],
	predicate: (element: T, index: number, arr: readonly T[]) => boolean,
): readonly [readonly T[], readonly T[]] {
	const truthy: T[] = [];
	const falsy: T[] = [];
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		if (predicate(item, i, array)) {
			truthy.push(item);
		} else {
			falsy.push(item);
		}
	}
	return [truthy, falsy];
}

export const SpellsListsToMemo: FC = () => {
	const filteredSpells = useFilteredSpells();
	const sort = useDndSortStore();

	const sortedSpells = useMemo(() => {
		return performSort(filteredSpells, sort);
	}, [filteredSpells, sort]);

	const favoritesStore = useFavoriteSpellsStore();

	const [favoriteSpells, unFavoriteSpells] = useMemo(
		() => fork(sortedSpells, (spell) => favoritesStore.favorites.includes(spell.id)),
		[favoritesStore.favorites, sortedSpells],
	);

	const dialogControl = useDialogControl<Spell>();

	return (
		<>
			{favoriteSpells.length > 0 && (
				<Stack gap={1} component="section">
					<h2>Favourite spells ({favoriteSpells.length})</h2>
					<SpellList
						spells={favoriteSpells}
						openSpellDialog={dialogControl.handleOpen}
						toggleFavorite={favoritesStore.toggleSpell}
						isFavourite
					/>
					<Divider />
				</Stack>
			)}

			<Stack gap={1} component="section">
				<h2>
					{favoriteSpells.length > 0 ? "Other spells" : "All spells"} (
					{unFavoriteSpells.length})
				</h2>
				<SpellList
					spells={unFavoriteSpells}
					openSpellDialog={dialogControl.handleOpen}
					toggleFavorite={favoritesStore.toggleSpell}
					isFavourite={false}
				/>
			</Stack>

			<ListEndDecor />

			<SpellDialog dialogControl={dialogControl} />
		</>
	);
};

export const SpellsLists = memo(SpellsListsToMemo);
