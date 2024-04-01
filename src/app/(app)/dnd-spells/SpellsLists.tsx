import { type FC, useState } from "react";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import { allSpells } from "@/app/(app)/dnd-spells/spells/allSpells";
import { parseSpell } from "@/app/(app)/dnd-spells/spells/parseSpell";
import { SpellDialog } from "@/app/(app)/dnd-spells/SpellDialog/SpellDialog";
import { createFilterOptions } from "@mui/joy/Autocomplete";
import Divider from "@mui/joy/Divider";
import { useFavoritesStore } from "@/app/(app)/dnd-spells/FavoriteButton";
import CircularProgress from "@mui/joy/CircularProgress";
import { useHasRendered } from "@/components/useHasRendered";
import Stack from "@mui/joy/Stack";
import { ListEndDecor } from "@/components/ListEndDecor";
import { SpellList } from "@/app/(app)/dnd-spells/FavouritesList";

const spells: Spell[] = allSpells
	.map(parseSpell)
	.sort((a, b) => a.level - b.level || a.title.localeCompare(b.title));

const filterOptions = createFilterOptions<Spell>({});
const getSpellSearchableLabel = (spell: Spell) => spell.searchLabel;

function fork<T>(
	array: T[],
	predicate: (element: T, index: number, array: T[]) => boolean
): [T[], T[]] {
	return array.reduce<[T[], T[]]>(
		([truthful, falseful], element, ...props) => {
			(predicate(element, ...props) ? truthful : falseful).push(element);
			return [truthful, falseful];
		},
		[[], []]
	);
}

interface Props {
	search: string;
	selectedClasses: number[];
}

export const SpellsLists: FC<Props> = ({ search, selectedClasses }) => {
	const [dialogSpell, setDialogSpell] = useState<Spell | null>(null);

	const filteredSpells = (() => {
		const spellsAfterTextSearch = filterOptions(spells, {
			inputValue: search,
			getOptionLabel: getSpellSearchableLabel
		});

		return spellsAfterTextSearch.filter(
			(spell) =>
				spell.classes.some((spellClass) => selectedClasses.includes(spellClass)) ||
				spell.classesTce.some((spellClass) => selectedClasses.includes(spellClass))
		);
	})();

	const favoritesStore = useFavoritesStore();

	const [favoriteSpells, unFavoriteSpells] = fork(filteredSpells, (spell) =>
		favoritesStore.favorites.includes(spell.id)
	);

	// localstorage, client only(
	const rendered = useHasRendered();
	if (!rendered) {
		return (
			<Stack justifyContent="center" alignItems="center" minHeight="200px">
				<CircularProgress />
			</Stack>
		);
	}

	return (
		<>
			{favoriteSpells.length > 0 && (
				<>
					<SpellList
						spells={favoriteSpells}
						setDialogSpell={setDialogSpell}
						isFavourite
					/>
					<Divider />
				</>
			)}

			<SpellList
				spells={unFavoriteSpells}
				setDialogSpell={setDialogSpell}
				isFavourite={false}
			/>

			<ListEndDecor />

			<SpellDialog
				spell={dialogSpell}
				onClose={() => {
					setDialogSpell(null);
				}}
			/>
		</>
	);
};
