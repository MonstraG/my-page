import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import type { FavoriteSpellsActions } from "@/components/spells/favouriteSpellsStore";
import { RitualChip } from "@/components/spells/RitualChip";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { ButtonList, ButtonListButton } from "@/ui/ButtonList/ButtonList";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

interface Props {
	spells: Spell[];
	openSpellDialog: (newSpell: Spell) => void;
	isFavourite: boolean;
	toggleFavorite: FavoriteSpellsActions["toggleSpell"];
}

export const SpellList: FC<Props> = ({ spells, openSpellDialog, isFavourite, toggleFavorite }) => (
	<ButtonList>
		{spells.map((spell) => (
			<ButtonListButton
				key={spell.id}
				endDecorator={
					<FavoriteButton
						spellId={spell.id}
						isFavorite={isFavourite}
						toggleFavorite={toggleFavorite}
					/>
				}
				onClick={() => openSpellDialog(spell)}
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
