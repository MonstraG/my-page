"use client";
import {
	type DndClass,
	dndClasses,
	type DndSchool,
	dndSchools,
	type DndSource,
	dndSources,
	type DndTag,
	searchableDndTags,
} from "@/components/spells/spellData/spells.types";
import { createStateContext } from "@/functions/createSimpleContext.tsx";

export interface DnDFilterState {
	search: string;
	classes: readonly DndClass[];
	schools: readonly DndSchool[];
	tags: readonly DndTag[];
	sources: readonly DndSource[];
}

const initialValue = {
	search: "",
	classes: dndClasses,
	schools: dndSchools,
	tags: searchableDndTags,
	sources: dndSources,
} satisfies DnDFilterState;

const context = createStateContext<DnDFilterState>(initialValue);

export const DndFiltersContextProvider = context.Provider;

export const useDndFiltersContext = context.useContextHook;

export const useResetDndFiltersContext = () => {
	const { setValue } = useDndFiltersContext();
	return () => setValue(initialValue);
};
