"use client";
import { performSort } from "@/components/spells/Sort/Sort";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { SpellDialog } from "@/components/spells/SpellDialog/SpellDialog";
import { SpellList } from "@/components/spells/SpellList";
import { useFilteredSpells } from "@/components/spells/useFilteredSpells";
import { useDialogControl } from "@/ui/Dialog/useDialogControl";
import { Divider } from "@/ui/Divider/Divider";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";
import { useSpellSortContext } from "@/components/spells/Sort/SpellSortContext";
import { useFavouriteSpellsState } from "@/components/spells/useFavouriteSpellsState.ts";

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

export const SpellsLists: FC = () => {
	const filteredSpells = useFilteredSpells();
	const { sort } = useSpellSortContext();

	const sortedSpells = performSort(filteredSpells, sort);

	const [favourites, toggleFavourite] = useFavouriteSpellsState();

	const [favoriteSpells, unFavoriteSpells] = fork(sortedSpells, (spell) =>
		favourites.has(spell.id),
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
						toggleFavorite={toggleFavourite}
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
					toggleFavorite={toggleFavourite}
					isFavourite={false}
				/>
			</Stack>

			<ListEndDecor />

			<SpellDialog dialogControl={dialogControl} />
		</>
	);
};
