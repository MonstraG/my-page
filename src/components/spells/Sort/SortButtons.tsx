"use client";
import { getSortDirectionIcon, type Sort } from "@/components/spells/Sort/Sort";
import { useDndSortStore } from "@/components/spells/Sort/useDndSortStore";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { Button } from "@/ui/Button/Button";
import type { FC } from "react";

function changeSort(key: Sort<Spell>["col"]): void {
	useDndSortStore.setState((prev) => {
		if (prev.col === key) {
			return { col: prev.col, dir: prev.dir === "asc" ? "desc" : "asc" };
		}
		return { col: key, dir: "asc" };
	});
}

export const SortButtons: FC = () => {
	const sort = useDndSortStore();

	return (
		<>
			<Button
				endDecorator={getSortDirectionIcon("name", sort)}
				active={sort.col == "name"}
				onClick={() => changeSort("name")}
			>
				Sort by name
			</Button>
			<Button
				endDecorator={getSortDirectionIcon("level", sort)}
				active={sort.col == "level"}
				onClick={() => changeSort("level")}
			>
				Sort by level
			</Button>
		</>
	);
};
