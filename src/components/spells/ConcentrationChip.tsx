import { Chip } from "@/ui/Chip/Chip";
import type { FC } from "react";

interface Props {
	short?: boolean;
}

export const ConcentrationChip: FC<Props> = ({ short }) => (
	<Chip style={{ background: "rgba(89, 192, 184, 0.9)" }} size={short ? "sm" : "md"}>
		{short ? "K" : "Концентрация"}
	</Chip>
);
