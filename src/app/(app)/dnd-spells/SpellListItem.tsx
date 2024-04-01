import type { FC, ReactNode } from "react";
import ListItemButton from "@mui/joy/ListItemButton";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import Typography from "@mui/joy/Typography";
import { ConcentrationChip } from "@/app/(app)/dnd-spells/ConcentrationChip";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import { RitualChip } from "@/app/(app)/dnd-spells/RitualChip";
import type { SxProps } from "@mui/joy/styles/types";

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
			<ListItemContent>
				<Typography component="span" level="title-sm">
					[{spell.level}] {spell.title} ({spell.titleEn}){" "}
					{spell.ritual && <RitualChip short />}{" "}
					{spell.concentration && <ConcentrationChip short />}
				</Typography>
				<Typography level="body-sm" noWrap>
					{spell.simpleDesc}
				</Typography>
			</ListItemContent>
		</ListItemButton>
	</ListItem>
);
