import { Chip } from "@/ui/Chip/Chip";
import type { FC } from "react";

interface Props {
	short?: boolean;
}

export const RitualChip: FC<Props> = ({ short }) => (
	<Chip style={{ backgroundColor: "rgba(206,62,62,0.9)" }} size={short ? "sm" : "md"}>
		{short ? "R" : "Ritual"}
	</Chip>
);
