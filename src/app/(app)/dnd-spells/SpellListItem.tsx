import { type FC } from "react";
import ListItemButton from "@mui/joy/ListItemButton";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";

interface Props {
	spell: Spell;
	onClick: (spell: Spell) => void;
}

export const SpellListItem: FC<Props> = ({ spell, onClick }) => (
	<ListItemButton
		onClick={() => {
			onClick(spell);
		}}
	>
		({spell.level}) {spell.title} ({spell.titleEn})
	</ListItemButton>
);
