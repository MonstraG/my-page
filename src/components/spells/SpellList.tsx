import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import type { FavoriteSpellsActions } from "@/components/spells/favouriteSpellsStore";
import { RitualChip } from "@/components/spells/RitualChip";
import { SchoolIcon } from "@/components/spells/SchoolIcon/SchoolIcon";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { ButtonList, ButtonListButton } from "@/ui/ButtonList/ButtonList";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import { type CSSProperties, type FC, memo } from "react";

const noHtmlRegex = /<\/?[a-z]+>/g;

function stripHtmlTags(html: string) {
	return html.replaceAll(noHtmlRegex, "");
}

const stackStyles: CSSProperties = { alignItems: "center" };

const divStyles: CSSProperties = { minWidth: 0 };

interface Props {
	spells: readonly Spell[];
	openSpellDialog: (newSpell: Spell) => void;
	isFavourite: boolean;
	toggleFavorite: FavoriteSpellsActions["toggleSpell"];
}

export const SpellList: FC<Props> = ({ spells, openSpellDialog, isFavourite, toggleFavorite }) => (
	<ButtonList>
		{spells.map((spell) => (
			<SpellRow
				key={spell.id}
				spell={spell}
				isFavourite={isFavourite}
				toggleFavorite={toggleFavorite}
				openSpellDialog={openSpellDialog}
			/>
		))}
	</ButtonList>
);

interface SpellRowProps {
	spell: Spell;
	isFavourite: boolean;
	toggleFavorite: FavoriteSpellsActions["toggleSpell"];
	openSpellDialog: (newSpell: Spell) => void;
}

const SpellRowToMemo: FC<SpellRowProps> = ({
	spell,
	isFavourite,
	toggleFavorite,
	openSpellDialog,
}) => (
	<ButtonListButton
		endDecorator={
			<FavoriteButton
				spellId={spell.id}
				isFavorite={isFavourite}
				toggleFavorite={toggleFavorite}
				tooltipPlacement="left"
			/>
		}
		onClick={() => openSpellDialog(spell)}
	>
		<Stack direction="row" gap={1} style={stackStyles}>
			<SchoolIcon spell={spell} />

			<div style={divStyles}>
				<Paragraph size="sm">
					<span>
						[{spell.level}] {spell.name}{" "}
					</span>
					{spell.ritual && <RitualChip short />}{" "}
					{spell.concentration && <ConcentrationChip short />}
				</Paragraph>
				<Paragraph size="sm" color="superGray" noWrap>
					{stripHtmlTags(spell.description)}
				</Paragraph>
			</div>
		</Stack>
	</ButtonListButton>
);

const SpellRow = memo(SpellRowToMemo);
