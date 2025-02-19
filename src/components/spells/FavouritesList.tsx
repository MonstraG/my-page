import type { Dispatch, FC, SetStateAction } from "react";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { RitualChip } from "@/components/spells/RitualChip";
import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import { Stack } from "@/ui/Stack/Stack";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { ButtonList, ButtonListButton } from "@/ui/ButtonList/ButtonList";

interface Props {
	spells: Spell[];
	setDialogSpell: Dispatch<SetStateAction<Spell | null>>;
	isFavourite: boolean;
}

export const SpellList: FC<Props> = ({ spells, setDialogSpell, isFavourite }) => (
	<ButtonList>
		{spells.map((spell) => (
			<ButtonListButton
				key={spell.id}
				endDecorator={<FavoriteButton spellId={spell.id} isFavorite={isFavourite} />}
				onClick={() => {
					setDialogSpell(spell);
				}}
			>
				<Stack direction="column" style={{ padding: "6px 12px" }}>
					<Paragraph size="sm" component="div">
						[{spell.level}] {spell.title} ({spell.titleEn}){" "}
						{spell.ritual && <RitualChip short />}{" "}
						{spell.concentration && <ConcentrationChip short />}
					</Paragraph>
					<Paragraph size="sm" color="superGray" noWrap component="div">
						{spell.simpleDesc}
					</Paragraph>
				</Stack>
			</ButtonListButton>
		))}
	</ButtonList>
);
