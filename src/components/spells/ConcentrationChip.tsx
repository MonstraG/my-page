import type { FC } from "react";
import { Chip } from "@/ui/Chip/Chip";

interface Props {
	short?: boolean;
}

export const ConcentrationChip: FC<Props> = ({ short }) => (
	<Chip style={{ background: "rgba(89, 192, 184, 0.9)" }} size={short ? "sm" : "md"}>
		{short ? "K" : "Концентрация"}
	</Chip>
);
