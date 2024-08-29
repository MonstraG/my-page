import { type FC, type MouseEvent, useCallback, useState } from "react";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { dndConceptTooltips } from "@/components/spells/spellData/dndConceptTooltips";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";

interface Props {
	spell: Spell;
}

export const SpellDescription: FC<Props> = ({ spell }) => {
	const [openTooltip, setOpenTooltip] = useState<string | null>(null);
	const handleDescriptionClick = useCallback((e: MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement;
		const attribute = target.attributes.getNamedItem("tooltip-for");
		if (attribute) {
			setOpenTooltip(attribute.value);
		}
	}, []);

	const tooltipToShow = openTooltip !== null && dndConceptTooltips[openTooltip];

	return (
		<>
			<Box
				dangerouslySetInnerHTML={{ __html: spell.description }}
				onClick={handleDescriptionClick}
				sx={{
					["[tooltip-for]"]: {
						color: "primary.plainColor",
						borderBottom: "1px dashed",
						borderColor: "primary.plainColor",
						cursor: "help"
					},
					"p:first-of-type": {
						mt: 0
					},
					"p:last-of-type": {
						mb: 0
					},
					ul: {
						pl: 2
					},
					table: {
						borderCollapse: "collapse",
						width: "100%"
					},
					td: {
						border: "1px solid",
						borderColor: "neutral.outlinedBorder",
						p: 0.5
					}
				}}
			/>

			<Modal
				disableScrollLock
				hideBackdrop
				onClose={() => {
					setOpenTooltip(null);
				}}
				open={Boolean(tooltipToShow)}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					overflow: "auto"
				}}
			>
				<Sheet
					variant="outlined"
					sx={{
						borderRadius: "md",
						p: 3,
						m: 3,
						maxWidth: "400px"
					}}
				>
					<ModalClose variant="plain" />
					{tooltipToShow && (
						<>
							<Typography component="h4" level="body-lg" mb={1}>
								<span dangerouslySetInnerHTML={{ __html: tooltipToShow.name }} />
							</Typography>
							<Typography component="div">
								<p dangerouslySetInnerHTML={{ __html: tooltipToShow.desc }} />
							</Typography>
						</>
					)}
				</Sheet>
			</Modal>
		</>
	);
};
