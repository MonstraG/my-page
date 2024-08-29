import type { FC } from "react";
import Chip from "@mui/joy/Chip";

interface Props {
	short?: boolean;
}

export const RitualChip: FC<Props> = ({ short }) => (
	<Chip sx={{ bgcolor: "rgba(206,62,62,0.9)" }} variant="solid" size={short ? "sm" : "md"}>
		{short ? "Р" : "Ритуал"}
	</Chip>
);
