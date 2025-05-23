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
import { create } from "zustand";

export interface DnDFilterState {
	search: string;
	classes: readonly DndClass[];
	schools: readonly DndSchool[];
	tags: readonly DndTag[];
	sources: readonly DndSource[];
}

export const useDndFilterStore = create<DnDFilterState>(() => ({
	search: "",
	classes: dndClasses,
	schools: dndSchools,
	tags: searchableDndTags,
	sources: dndSources,
}));
