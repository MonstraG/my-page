import { SpellList } from "@/components/spells/FavouritesList";
import { useFavoriteSpellsStore } from "@/components/spells/favouriteSpellsStore";
import { fullDndClassSelection } from "@/components/spells/MoreFilters";
import { parseSpell } from "@/components/spells/spellData/parseSpell";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { spellsPartOne } from "@/components/spells/spellData/spellsPartOne";
import { spellsPartTwo } from "@/components/spells/spellData/spellsPartTwo";
import { SpellDialog } from "@/components/spells/SpellDialog/SpellDialog";
import { useDialogControl } from "@/ui/Dialog/useDialogControl";
import { Divider } from "@/ui/Divider/Divider";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, memo, useMemo } from "react";

const spells: Spell[] = spellsPartOne
	.concat(spellsPartTwo)
	.map(parseSpell)
	.sort((a, b) => a.level - b.level || a.title.localeCompare(b.title));

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
	selectedClasses: number[];
}

export const SpellsListsToMemo: FC<Props> = ({ search, selectedClasses }) => {
	const filteredSpells = useMemo(() => {
		if (selectedClasses.length === 0) {
			return [];
		}

		let result = spells;

		if (selectedClasses.length !== fullDndClassSelection.length) {
			result = result.filter(
				(spell) =>
					spell.classes.some((spellClass) => selectedClasses.includes(spellClass))
					|| spell.classesTce.some((spellClass) => selectedClasses.includes(spellClass)),
			);
		}

		if (search) {
			const lowercaseSearch = search.toLowerCase();
			result = spells.filter((spell) => spell.searchLabel.includes(lowercaseSearch));
		}

		return result;
	}, [search, selectedClasses]);

	const favoritesStore = useFavoriteSpellsStore();

	const [favoriteSpells, unFavoriteSpells] = useMemo(
		() => fork(filteredSpells, (spell) => favoritesStore.favorites.includes(spell.id)),
		[favoritesStore.favorites, filteredSpells],
	);

	const dialogControl = useDialogControl<Spell>();

	return (
		<Stack gap={1}>
			{favoriteSpells.length > 0 && (
				<>
					<h2>Favourite spells</h2>
					<SpellList
						spells={favoriteSpells}
						openSpellDialog={dialogControl.handleOpen}
						toggleFavorite={favoritesStore.toggleSpell}
						isFavourite
					/>
					<Divider />
				</>
			)}
			<h2>{favoriteSpells.length > 0 ? "Other spells" : "All spells"}</h2>
			<SpellList
				spells={unFavoriteSpells}
				openSpellDialog={dialogControl.handleOpen}
				toggleFavorite={favoritesStore.toggleSpell}
				isFavourite={false}
			/>
			<ListEndDecor />

			<SpellDialog control={dialogControl} />
		</Stack>
	);
};

export const SpellsLists = memo(SpellsListsToMemo);
