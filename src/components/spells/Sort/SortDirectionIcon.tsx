import type { Sort } from "@/components/spells/Sort/Sort";
import { NorthIcon } from "@/icons/material/NorthIcon";
import { SouthIcon } from "@/icons/material/SouthIcon";
import { SwapVertIcon } from "@/icons/material/SwapVertIcon";
import type { FC } from "react";

export const SortDirectionIcon: FC<{ column: string; sort: Sort<never> }> = ({ column, sort }) => {
	if (column !== sort.col) {
		return <SwapVertIcon />;
	}

	if (sort.dir === "asc") {
		return <NorthIcon />;
	}
	return <SouthIcon />;
};
