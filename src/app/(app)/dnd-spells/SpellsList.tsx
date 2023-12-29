import type { FC } from "react";
import ListItemButton from "@mui/joy/ListItemButton";
import List from "@mui/joy/List";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import { allSpells } from "@/app/(app)/dnd-spells/spells/allSpells";
import { parseSpell } from "@/app/(app)/dnd-spells/spells/parseSpell";

const spells: Spell[] = allSpells
	.map(parseSpell)
	.sort((a, b) => a.level - b.level || a.title.localeCompare(b.title));

interface Props {
	search: string;
}

export const SpellsList: FC<Props> = ({ search }) => {
	const filteredSpells = (() => {
		if (!search) {
			return spells;
		}
		return spells.filter(
			(spell) => spell.title.includes(search) || spell.titleEn.includes(search)
		);
	})();

	return (
		<List>
			{filteredSpells.map((spell) => (
				<ListItemButton key={spell.id}>
					({spell.level}) {spell.title} ({spell.titleEn})
				</ListItemButton>
			))}
		</List>
	);
};
