import { type FC, memo, useMemo, useState } from "react";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { parseSpell } from "@/components/spells/spellData/parseSpell";
import { SpellDialog } from "@/components/spells/SpellDialog/SpellDialog";
import Divider from "@mui/joy/Divider";
import { useFavoritesStore } from "@/components/spells/FavoriteButton";
import CircularProgress from "@mui/joy/CircularProgress";
import { useHasRendered } from "@/components/useHasRendered";
import Stack from "@mui/joy/Stack";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { SpellList } from "@/components/spells/FavouritesList";
import { spellsPartOne } from "@/components/spells/spellData/spellsPartOne";
import { spellsPartTwo } from "@/components/spells/spellData/spellsPartTwo";
import { fullDndClassSelection } from "@/components/spells/MoreFilters";

const spells: Spell[] = spellsPartOne
	.concat(spellsPartTwo)
	.map(parseSpell)
	.sort((a, b) => a.level - b.level || a.title.localeCompare(b.title));

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

export const SpellsListsToMemo: FC<Props> = ({ search, selectedClasses }) => {
	const [dialogSpell, setDialogSpell] = useState<Spell | null>(null);

	const filteredSpells = useMemo(() => {
		if (selectedClasses.length === 0) {
			return [];
		}

		let result = spells;

		if (selectedClasses.length !== fullDndClassSelection.length) {
			result = result.filter(
				(spell) =>
					spell.classes.some((spellClass) => selectedClasses.includes(spellClass)) ||
					spell.classesTce.some((spellClass) => selectedClasses.includes(spellClass))
			);
		}

		if (search) {
			const lowercaseSearch = search.toLowerCase();
			result = spells.filter((spell) => spell.searchLabel.includes(lowercaseSearch));
		}

		return result;
	}, [search, selectedClasses]);

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

export const SpellsLists = memo(SpellsListsToMemo);
