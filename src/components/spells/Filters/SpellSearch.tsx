"use client";
import {
	type DnDFilterState,
	useDndFilterStore,
} from "@/components/spells/Filters/useDndFilterStore";
import { SearchIcon } from "@/icons/material/SearchIcon";
import { Input } from "@/ui/Input/Input";
import type { ChangeEvent, FC } from "react";

function selector(state: DnDFilterState) {
	return state.search;
}
function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
	useDndFilterStore.setState({ search: event.target.value });
}

export const SpellSearch: FC = () => {
	const search = useDndFilterStore(selector);

	return (
		<Input
			startDecorator={<SearchIcon />}
			placeholder="Search"
			value={search}
			onChange={handleSearchChange}
		/>
	);
};
