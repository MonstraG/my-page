import { type FC, useState } from "react";
import List from "@mui/joy/List";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import { allSpells } from "@/app/(app)/dnd-spells/spells/allSpells";
import { parseSpell } from "@/app/(app)/dnd-spells/spells/parseSpell";
import { SpellListItem } from "@/app/(app)/dnd-spells/SpellListItem";
import { SpellDialog } from "@/app/(app)/dnd-spells/SpellDialog";

const spells: Spell[] = allSpells
	.map(parseSpell)
	.sort((a, b) => a.level - b.level || a.title.localeCompare(b.title));

interface Props {
	search: string;
}

export const SpellsList: FC<Props> = ({ search }) => {
	const [spellForDialog, setSpellForDialog] = useState<Spell | null>(null);

	const filteredSpells = (() => {
		if (!search) {
			return spells;
		}
		return spells.filter(
			(spell) => spell.title.includes(search) || spell.titleEn.includes(search)
		);
	})();

	return (
		<>
			<List>
				{filteredSpells.map((spell) => (
					<SpellListItem key={spell.id} spell={spell} onClick={setSpellForDialog} />
				))}
			</List>
			<SpellDialog spell={spellForDialog} onClose={() => setSpellForDialog(null)} />
		</>
	);
};
