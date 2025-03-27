import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import { useFavoriteSpellsStore } from "@/components/spells/favouriteSpellsStore";
import { RitualChip } from "@/components/spells/RitualChip";
import { SchoolIcon } from "@/components/spells/SchoolIcon/SchoolIcon";
import { type Spell } from "@/components/spells/spellData/spells.types";
import { SpellDescription } from "@/components/spells/SpellDialog/SpellDescription";
import { SpellPropertyListItem } from "@/components/spells/SpellDialog/SpellPropertyListItem";
import { Dialog } from "@/ui/Dialog/Dialog";
import type { DialogControl } from "@/ui/Dialog/useDialogControl";
import { Divider } from "@/ui/Divider/Divider";
import { List } from "@/ui/List/List";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

interface Props {
	control: DialogControl<Spell>;
}

export const SpellDialog: FC<Props> = ({ control }) => (
	<Dialog ref={control.handleRef}>
		<DialogContent spell={control.context} />
	</Dialog>
);

function formatWithUnits(thing: { value: number; unit: string } | string) {
	if (typeof thing === "string") {
		return thing;
	}

	if (thing.value > 1 && thing.unit !== "ft") {
		return `${thing.value} ${thing.unit}s`;
	}
	return `${thing.value} ${thing.unit}`;
}

const listFormatAnd = new Intl.ListFormat("en", { type: "conjunction" });
const listFormatOr = new Intl.ListFormat("en", { type: "disjunction" });

interface DialogContentProps {
	spell: Spell | null;
}

const DialogContent: FC<DialogContentProps> = ({ spell }) => {
	const favoritesStore = useFavoriteSpellsStore();

	if (!spell) {
		return;
	}

	const level = spell.level > 0 ? `${spell.level} level` : "Cantrip";

	const damage = spell.damage
		? `${spell.damage} ${spell.damageType && listFormatOr.format(spell.damageType)}`
		: undefined;

	return (
		<Stack gap={1}>
			<Stack direction="row" gap={1}>
				<SchoolIcon spell={spell} />
				<div>
					<h3>{spell.name}</h3>

					<Paragraph color="superGray" style={{ fontStyle: "italic" }} component="div">
						{level}, {spell.school.toLowerCase()} {spell.ritual && <RitualChip />}{" "}
						{spell.concentration && <ConcentrationChip />}
					</Paragraph>

					{damage && (
						<Paragraph>
							{damage}
							{spell.aoeRange && "; " + spell.aoeRange}
						</Paragraph>
					)}
				</div>
			</Stack>

			<Divider />

			<List>
				{damage && <SpellPropertyListItem name="Damage" value={damage} />}
				<SpellPropertyListItem
					name="Cast time"
					value={formatWithUnits(spell.castingTime)}
				/>
				<SpellPropertyListItem name="Duration" value={formatWithUnits(spell.duration)} />
				{spell.range && (
					<SpellPropertyListItem
						name="Range"
						value={spell.aoeRange ? spell.aoeRange : formatWithUnits(spell.range)}
					/>
				)}
				<SpellPropertyListItem name="Components" value={spell.components} />
				<SpellPropertyListItem name="Classes" value={listFormatAnd.format(spell.classes)} />
				{spell.spellAttack && (
					<SpellPropertyListItem
						name="Spell attack"
						value={spell.spellAttack}
					/>
				)}
			</List>

			<Divider />

			<SpellDescription spell={spell} />

			<Stack
				direction="row"
				style={{ justifyContent: "end" }}
			>
				<FavoriteButton
					spellId={spell.id}
					isFavorite={favoritesStore.favorites.includes(spell.id)}
					toggleFavorite={favoritesStore.toggleSpell}
					tooltipPlacement="left"
				/>
			</Stack>
		</Stack>
	);
};
