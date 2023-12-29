import type { FC } from "react";
import Typography from "@mui/joy/Typography";

interface Props {
	short?: boolean;
}

export const ConcentrationChip: FC<Props> = ({ short }) => (
	<Typography
		component="span"
		variant="solid"
		level="body-xs"
		sx={{ bgcolor: "rgba(89, 192, 184, 0.9)" }}
	>
		{short ? "K" : "Концентрация"}
	</Typography>
);
