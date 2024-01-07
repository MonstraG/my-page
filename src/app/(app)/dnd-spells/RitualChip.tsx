import type { FC } from "react";
import Typography from "@mui/joy/Typography";

interface Props {
	short?: boolean;
}

export const RitualChip: FC<Props> = ({ short }) => (
	<Typography
		component="span"
		variant="solid"
		level="body-xs"
		sx={{ bgcolor: "rgba(204,46,46,0.9)" }}
	>
		{short ? "Р" : "Ритуал"}
	</Typography>
);
