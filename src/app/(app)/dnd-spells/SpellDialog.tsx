import type { FC } from "react";
import { dndArchetypes, dndClasses, type Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ListItem from "@mui/joy/ListItem";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import { SpellDescription } from "@/app/(app)/dnd-spells/SpellDescription";
import ModalDialog from "@mui/joy/ModalDialog";
import { ConcentrationChip } from "@/app/(app)/dnd-spells/ConcentrationChip";

interface Props {
	spell: Spell | null;
	onClose: () => void;
}

export const SpellDialog: FC<Props> = ({ spell, onClose }) => {
	if (spell == null) {
		return null;
	}

	const level = spell.level > 0 ? `${spell.level} уровень` : "Заговор";
	const ritual = spell.ritual ? " (ритуал)" : "";

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
							{spell.title}
						</Typography>
						<Typography component="h3" fontWeight="lg" fontStyle="italic">
							{level}, {spell.school.title.toLowerCase()} {ritual}{" "}
							{spell.concentration && <ConcentrationChip />}
						</Typography>
					</div>

					<List sx={{ p: 0 }}>
						<Divider />

						<ListItem sx={{ px: 0 }}>
							<span>
								<strong>Время кастования:</strong> {spell.castTime}
							</span>
						</ListItem>
						<ListItem sx={{ px: 0 }}>
							<span>
								<strong>Время действия:</strong> {spell.duration}
							</span>
						</ListItem>
						<ListItem sx={{ px: 0 }}>
							<span>
								<strong>Дистанция:</strong> {spell.distance}
							</span>
						</ListItem>
						<ListItem sx={{ px: 0 }}>
							<span>
								<strong>Компоненты:</strong> {spell.components}
							</span>
						</ListItem>
						<ListItem sx={{ px: 0 }}>
							<span>
								<strong>Классы:</strong>{" "}
								{spell.classes.map((c) => dndClasses[c]).join(", ")}
							</span>
						</ListItem>
						{spell.classesTce.length > 0 && (
							<ListItem sx={{ px: 0 }}>
								<span>
									<strong>Классы (TCE):</strong>{" "}
									{spell.classesTce.map((c) => dndClasses[c]).join(", ")}
								</span>
							</ListItem>
						)}
						{spell.archetypes.length > 0 && (
							<ListItem sx={{ px: 0 }}>
								<span>
									<strong>Архетипы:</strong>{" "}
									{spell.archetypes.map((c) => dndArchetypes[c]).join(", ")}
								</span>
							</ListItem>
						)}
						<Divider />
					</List>

					<SpellDescription spell={spell} />

					<Link href={spell.href} target="_blank">
						Открыть на dnd.su
					</Link>
				</Stack>
			</ModalDialog>
		</Modal>
	);
};
