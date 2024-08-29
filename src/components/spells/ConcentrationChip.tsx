import type { FC } from "react";
import Chip from "@mui/joy/Chip";

interface Props {
	short?: boolean;
}

export const ConcentrationChip: FC<Props> = ({ short }) => (
	<Chip sx={{ bgcolor: "rgba(89, 192, 184, 0.9)" }} variant="solid" size={short ? "sm" : "md"}>
		{short ? "K" : "Концентрация"}
	</Chip>
);
