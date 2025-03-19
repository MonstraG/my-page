import { ConcentrationChip } from "@/components/spells/ConcentrationChip";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import { useFavoriteSpellsStore } from "@/components/spells/favouriteSpellsStore";
import { RitualChip } from "@/components/spells/RitualChip";
import { dndArchetypes, dndClasses, type Spell } from "@/components/spells/spellData/spells.types";
import { SpellDescription } from "@/components/spells/SpellDialog/SpellDescription";
import { SpellPropertyListItem } from "@/components/spells/SpellDialog/SpellPropertyListItem";
import { Dialog } from "@/ui/Dialog/Dialog";
import type { DialogControl } from "@/ui/Dialog/useDialogControl";
import { Divider } from "@/ui/Divider/Divider";
import { List } from "@/ui/List/List";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

interface Props {
	control: DialogControl<Spell>;
}

export const SpellDialog: FC<Props> = ({ control }) => (
	<div>
		<Dialog ref={control.handleRef}>
			<DialogContent spell={control.context} />
		</Dialog>
	</div>
);

interface DialogContentProps {
	spell: Spell | null;
}

const DialogContent: FC<DialogContentProps> = ({ spell }) => {
	const favoritesStore = useFavoriteSpellsStore();

	if (!spell) {
		return;
	}

	const level = spell.level > 0 ? `${spell.level} уровень` : "Заговор";

	return (
		<Stack gap={1}>
			<div>
				<h3>
					{spell.title} ({spell.titleEn})
				</h3>

				<Paragraph color="superGray" style={{ fontStyle: "italic" }}>
					{level}, {spell.school.title.toLowerCase()} {spell.ritual && <RitualChip />}
					{" "}
					{spell.concentration && <ConcentrationChip />}
				</Paragraph>
			</div>

			<Divider />

			<List>
				<SpellPropertyListItem name="Время кастования" value={spell.castTime} />
				{spell.reactionTrigger && (
					<SpellPropertyListItem name="Условие реакции" value={spell.reactionTrigger} />
				)}
				<SpellPropertyListItem name="Время действия" value={spell.duration} />
				<SpellPropertyListItem name="Дистанция" value={spell.distance} />
				<SpellPropertyListItem name="Компоненты" value={spell.components} />
				<SpellPropertyListItem
					name="Классы"
					value={spell.classes.map((c) => dndClasses[c]).join(", ")}
				/>
				{spell.classesTce.length > 0 && (
					<SpellPropertyListItem
						name="Классы (TCE)"
						value={spell.classesTce.map((c) => dndClasses[c]).join(", ")}
					/>
				)}
				{spell.archetypes.length > 0 && (
					<SpellPropertyListItem
						name="Архетипы"
						value={spell.archetypes.map((c) => dndArchetypes[c]).join(", ")}
					/>
				)}
			</List>

			<Divider />

			<SpellDescription spell={spell} />

			<Stack
				direction="row"
				style={{ justifyContent: "space-between", alignItems: "flex-end" }}
			>
				<MyLink href={spell.href} target="_blank">
					Открыть на dnd.su
				</MyLink>
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
