import type { FC, ReactNode } from "react";
import ListItemButton from "@mui/joy/ListItemButton";
import type { Spell } from "@/components/spells/spellData/spells.types";
import Typography from "@mui/joy/Typography";
import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import { RitualChip } from "@/components/spells/RitualChip";
import type { SxProps } from "@mui/joy/styles/types";
import { memo } from "react";

const noGutter: SxProps = {
	px: 0
};

interface Props {
	spell: Spell;
	onClick: (spell: Spell) => void;
	endAction: ReactNode;
}

export const SpellListItem: FC<Props> = ({ spell, onClick, endAction }) => (
	<ListItem endAction={endAction} sx={noGutter}>
		<ListItemButton
			onClick={() => {
				onClick(spell);
			}}
		>
			<SpellListItemContent spell={spell} />
		</ListItemButton>
	</ListItem>
);

const SpellListItemContentToMemo: FC<{ spell: Spell }> = ({ spell }) => (
	<ListItemContent>
		<Typography component="span" level="title-sm">
			[{spell.level}] {spell.title} ({spell.titleEn}) {spell.ritual && <RitualChip short />}{" "}
			{spell.concentration && <ConcentrationChip short />}
		</Typography>
		<Typography level="body-sm" noWrap>
			{spell.simpleDesc}
		</Typography>
	</ListItemContent>
);

const SpellListItemContent = memo(SpellListItemContentToMemo);
