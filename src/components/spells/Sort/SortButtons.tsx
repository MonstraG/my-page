"use client";
import type { Sort } from "@/components/spells/Sort/Sort";
import { SortDirectionIcon } from "@/components/spells/Sort/SortDirectionIcon";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { Button } from "@/ui/Button/Button";
import type { FC } from "react";
import { useSpellSortContext } from "@/components/spells/Sort/SpellSortContext";

export const SortButtons: FC = () => {
	const { sort, setSort } = useSpellSortContext();

	function changeSort(key: Sort<Spell>["col"]) {
		setSort((prev) => {
			if (prev.col === key) {
				return { col: prev.col, dir: prev.dir === "asc" ? "desc" : "asc" };
			}
			return { col: key, dir: "asc" };
		});
	}

	return (
		<>
			<Button
				endDecorator={<SortDirectionIcon column="name" sort={sort} />}
				active={sort.col === "name"}
				onClick={() => changeSort("name")}
			>
				Sort by name
			</Button>
			<Button
				endDecorator={<SortDirectionIcon column="level" sort={sort} />}
				active={sort.col === "level"}
				onClick={() => changeSort("level")}
			>
				Sort by level
			</Button>
		</>
	);
};
