import type { FC } from "react";
import { dndArchetypes, dndClasses, type Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import { SpellDescription } from "@/app/(app)/dnd-spells/SpellDialog/SpellDescription";
import ModalDialog from "@mui/joy/ModalDialog";
import { ConcentrationChip } from "@/app/(app)/dnd-spells/ConcentrationChip";
import { SpellPropertyListItem } from "@/app/(app)/dnd-spells/SpellDialog/SpellPropertyListItem";
import { FavoriteButton, useFavoritesStore } from "@/app/(app)/dnd-spells/FavoriteButton";
import { RitualChip } from "@/app/(app)/dnd-spells/RitualChip";

interface Props {
	spell: Spell | null;
	onClose: () => void;
}

export const SpellDialog: FC<Props> = ({ spell, onClose }) => {
	const favoritesStore = useFavoritesStore();

	if (spell == null) {
		return null;
	}

	const level = spell.level > 0 ? `${spell.level} уровень` : "Заговор";

	return (
		<Modal aria-labelledby="spell-modal-title" open={Boolean(spell)} onClose={onClose}>
			<ModalDialog
				sx={{
					overflow: "auto",
					width: { xs: "100%", md: "unset" }
				}}
			>
				<Stack gap={2}>
					<ModalClose variant="plain" />
					<div>
						<Typography
							component="h2"
							id="spell-modal-title"
							level="h4"
							fontWeight="lg"
							mb={1}
						>
							{spell.title} ({spell.titleEn})
						</Typography>
						<Typography component="h3" fontWeight="lg" fontStyle="italic">
							{level}, {spell.school.title.toLowerCase()}{" "}
							{spell.ritual && <RitualChip />}{" "}
							{spell.concentration && <ConcentrationChip />}
						</Typography>
					</div>

					<List sx={{ p: 0 }}>
						<Divider />

						<SpellPropertyListItem name="Время кастования" value={spell.castTime} />
						{spell.reactionTrigger && (
							<SpellPropertyListItem
								name="Условие реакции"
								value={spell.reactionTrigger}
							/>
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
						<Divider />
					</List>

					<SpellDescription spell={spell} />

					<Stack direction="row" justifyContent="space-between" alignItems="flex-end">
						<Link href={spell.href} target="_blank">
							Открыть на dnd.su
						</Link>
						<FavoriteButton
							spellId={spell.id}
							isFavorite={favoritesStore.favorites.includes(spell.id)}
						/>
					</Stack>
				</Stack>
			</ModalDialog>
		</Modal>
	);
};
