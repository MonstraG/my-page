import type { FC } from "react";
import ListItemButton from "@mui/joy/ListItemButton";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import Typography from "@mui/joy/Typography";
import { ConcentrationChip } from "@/app/(app)/dnd-spells/ConcentrationChip";

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
		<Typography>
			[
			<Typography component="span" level="body-sm" fontWeight="lg">
				{spell.level}
			</Typography>
			] {spell.title} ({spell.titleEn}) {spell.concentration && <ConcentrationChip short />}
		</Typography>
	</ListItemButton>
);
