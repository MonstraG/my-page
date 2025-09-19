"use client";
import type { Sort } from "@/components/spells/Sort/Sort";
import { SortDirectionIcon } from "@/components/spells/Sort/SortDirectionIcon";
import { useDndSortStore } from "@/components/spells/Sort/useDndSortStore";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { Button } from "@/ui/Button/Button";
import type { FC } from "react";

function changeSort(key: Sort<Spell>["col"]) {
	useDndSortStore.setState((prev) => {
		if (prev.col === key) {
			return { col: prev.col, dir: prev.dir === "asc" ? "desc" : "asc" };
		}
		return { col: key, dir: "asc" };
	});
}
const handleSortByNameClick = () => {
	changeSort("name");
};

const handleSortByLevelClick = () => {
	changeSort("level");
};

export const SortButtons: FC = () => {
	const sort = useDndSortStore();

	return (
		<>
			<Button
				endDecorator={<SortDirectionIcon column="name" sort={sort} />}
				active={sort.col === "name"}
				onClick={handleSortByNameClick}
			>
				Sort by name
			</Button>
			<Button
				endDecorator={<SortDirectionIcon column="level" sort={sort} />}
				active={sort.col === "level"}
				onClick={handleSortByLevelClick}
			>
				Sort by level
			</Button>
		</>
	);
};
