import { type FC, useState } from "react";
import List from "@mui/joy/List";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import { allSpells } from "@/app/(app)/dnd-spells/spells/allSpells";
import { parseSpell } from "@/app/(app)/dnd-spells/spells/parseSpell";
import { SpellListItem } from "@/app/(app)/dnd-spells/SpellListItem";
import { SpellDialog } from "@/app/(app)/dnd-spells/SpellDialog/SpellDialog";
import { createFilterOptions } from "@mui/joy/Autocomplete";
import Divider from "@mui/joy/Divider";
import { FavoriteButton, useFavoritesStore } from "@/app/(app)/dnd-spells/FavoriteButton";
import CircularProgress from "@mui/joy/CircularProgress";
import { useHasRendered } from "@/components/useHasRendered";
import Stack from "@mui/joy/Stack";

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
}

export const SpellsList: FC<Props> = ({ search }) => {
	const [dialogSpell, setDialogSpell] = useState<Spell | null>(null);

	const filteredSpells = filterOptions(spells, {
		inputValue: search,
		getOptionLabel: getSpellSearchableLabel
	});

	const favoritesStore = useFavoritesStore();

	const [favorite, other] = fork(filteredSpells, (spell) =>
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
			{favorite.length > 0 && (
				<>
					<List>
						{favorite.map((spell) => (
							<SpellListItem
								key={spell.id}
								spell={spell}
								onClick={setDialogSpell}
								endAction={<FavoriteButton spellId={spell.id} isFavorite={true} />}
							/>
						))}
					</List>
					<Divider />
				</>
			)}

			<List>
				{other.map((spell) => (
					<SpellListItem
						key={spell.id}
						spell={spell}
						onClick={setDialogSpell}
						endAction={<FavoriteButton spellId={spell.id} isFavorite={false} />}
					/>
				))}
			</List>

			<SpellDialog
				spell={dialogSpell}
				onClose={() => {
					setDialogSpell(null);
				}}
			/>
		</>
	);
};
