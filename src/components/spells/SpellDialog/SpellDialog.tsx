import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import { useFavoriteSpellsStore } from "@/components/spells/favouriteSpellsStore";
import { RitualChip } from "@/components/spells/RitualChip";
import { SchoolIcon } from "@/components/spells/SchoolIcon/SchoolIcon";
import { type Spell } from "@/components/spells/spellData/spells.types";
import { SpellDescription } from "@/components/spells/SpellDialog/SpellDescription";
import { SpellPropertyListItem } from "@/components/spells/SpellDialog/SpellPropertyListItem";
import { CloseIcon } from "@/icons/material/CloseIcon";
import { Button } from "@/ui/Button/Button";
import { Chip } from "@/ui/Chip/Chip";
import { Dialog } from "@/ui/Dialog/Dialog";
import type { DialogControl } from "@/ui/Dialog/useDialogControl";
import { List } from "@/ui/List/List";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

interface Props {
	dialogControl: DialogControl<Spell>;
}

export const SpellDialog: FC<Props> = ({ dialogControl }) => (
	<Dialog ref={dialogControl.handleRef}>
		<DialogContent spell={dialogControl.context} handleClose={dialogControl.handleClose} />
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
	handleClose: () => void;
}

const DialogContent: FC<DialogContentProps> = ({ spell, handleClose }) => {
	const favoritesStore = useFavoriteSpellsStore();

	if (!spell) {
		return;
	}

	const level = spell.level > 0 ? `${spell.level} level` : "Cantrip";

	const damage = spell.damage
		? `${spell.damage.value} ${listFormatOr.format(spell.damage.type)}`
		: undefined;

	return (
		<Stack gap={1}>
			<Stack
				direction="row"
				gap={1}
				style={{ justifyContent: "space-between", alignItems: "start" }}
			>
				<SchoolIcon spell={spell} />
				<div style={{ flexGrow: 1 }}>
					<h3>{spell.name}</h3>

					<Paragraph
						color="superGray"
						style={{ fontStyle: "italic" }}
						component="div"
					>
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
				<Button
					endDecorator={<CloseIcon />}
					size="sm"
					onClick={handleClose}
				>
					Close
				</Button>
			</Stack>

			<Sheet elevation={2}>
				<List disableGutters>
					{damage && <SpellPropertyListItem name="Damage" value={damage} />}
					<SpellPropertyListItem
						name="Cast time"
						value={formatWithUnits(spell.castingTime)}
					/>
					<SpellPropertyListItem
						name="Duration"
						value={formatWithUnits(spell.duration)}
					/>
					{spell.range && (
						<SpellPropertyListItem
							name="Range"
							value={spell.aoeRange ? spell.aoeRange : formatWithUnits(spell.range)}
						/>
					)}
					<SpellPropertyListItem name="Components" value={spell.components} />
					<SpellPropertyListItem
						name="Classes"
						value={listFormatAnd.format(spell.classes)}
					/>
					{spell.spellAttack && (
						<SpellPropertyListItem
							name="Spell attack"
							value={spell.spellAttack}
						/>
					)}
				</List>
			</Sheet>

			<SpellDescription spell={spell} />

			<Stack
				direction="row"
				style={{ justifyContent: "space-between" }}
			>
				<Stack direction="row" style={{ alignItems: "center" }} gap={0.5}>
					{spell.tags.map(tag => <Chip key={tag}>{tag}</Chip>)}
				</Stack>

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
