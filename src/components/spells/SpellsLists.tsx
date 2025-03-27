import { SpellList } from "@/components/spells/FavouritesList";
import { useFavoriteSpellsStore } from "@/components/spells/favouriteSpellsStore";
import { performSort, type Sort } from "@/components/spells/Sort";
import { allSpells } from "@/components/spells/spellData/spells";
import {
	type DndClass,
	dndClasses,
	type DndSchool,
	dndSchools,
	type DndTag,
	searchableDndTags,
	type Spell,
} from "@/components/spells/spellData/spells.types";
import { SpellDialog } from "@/components/spells/SpellDialog/SpellDialog";
import { useDialogControl } from "@/ui/Dialog/useDialogControl";
import { Divider } from "@/ui/Divider/Divider";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, memo, useMemo } from "react";

function fork<T>(
	array: T[],
	predicate: (element: T, index: number, array: T[]) => boolean,
): [T[], T[]] {
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

interface Props {
	search: string;
	selectedClasses: readonly DndClass[];
	selectedSchools: readonly DndSchool[];
	selectedTags: readonly DndTag[];
	sort: Sort<Spell>;
}

export const SpellsListsToMemo: FC<Props> = (
	{ search, selectedClasses, selectedSchools, selectedTags, sort },
) => {
	const filteredSpells = useMemo(() => {
		if (selectedClasses.length === 0 || selectedSchools.length === 0) {
			return [];
		}

		let result = allSpells;

		if (selectedClasses.length !== dndClasses.length) {
			result = result.filter(
				(spell) => spell.classes.some((dndClass) => selectedClasses.includes(dndClass)),
			);
		}
		if (selectedSchools.length !== dndSchools.length) {
			result = result.filter((spell) => selectedSchools.includes(spell.school));
		}
		if (selectedTags.length > 0 && selectedTags.length !== searchableDndTags.length) {
			result = result.filter((spell) => spell.tags.some((tag) => selectedTags.includes(tag)));
		}

		if (search) {
			const lowercaseSearch = search.toLowerCase();
			result = result.filter((spell) => spell.filterName.includes(lowercaseSearch));
		}

		return result;
	}, [search, selectedClasses, selectedSchools, selectedTags]);

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
					{favoriteSpells.length > 0 ? "Other spells" : "All spells"}{" "}
					({unFavoriteSpells.length})
				</h2>
				<SpellList
					spells={unFavoriteSpells}
					openSpellDialog={dialogControl.handleOpen}
					toggleFavorite={favoritesStore.toggleSpell}
					isFavourite={false}
				/>
			</Stack>

			<ListEndDecor />

			<SpellDialog control={dialogControl} />
		</>
	);
};

export const SpellsLists = memo(SpellsListsToMemo);
