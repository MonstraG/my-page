import {
	type DndClass,
	dndClasses,
	type DndSchool,
	dndSchools,
	type DndTag,
	searchableDndTags,
} from "@/components/spells/spellData/spells.types";
import type { SetStateAction } from "react";
import { create } from "zustand";

export interface DnDFilterState {
	search: string;
	classes: readonly DndClass[];
	schools: readonly DndSchool[];
	tags: readonly DndTag[];
}

export const useDndFilterStore = create<DnDFilterState>(() => ({
	search: "",
	classes: dndClasses,
	schools: dndSchools,
	tags: searchableDndTags,
}));

export function applySetStateAction<T extends object>(
	prev: T,
	setStateAction: SetStateAction<T>,
): T {
	if (typeof setStateAction === "function") {
		return setStateAction(prev);
	}
	return setStateAction;
}
