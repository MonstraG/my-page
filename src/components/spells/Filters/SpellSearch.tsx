"use client";
import { useDndFiltersContext } from "@/components/spells/Filters/useDndFilterStore";
import { SearchIcon } from "@/icons/material/SearchIcon";
import { Input } from "@/ui/Input/Input";
import type { FC } from "react";

export const SpellSearch: FC = () => {
	const { value, setValue } = useDndFiltersContext();

	return (
		<Input
			startDecorator={<SearchIcon />}
			placeholder="Search"
			value={value.search}
			onChange={(event) => setValue((prev) => ({ ...prev, search: event.target.value }))}
		/>
	);
};
