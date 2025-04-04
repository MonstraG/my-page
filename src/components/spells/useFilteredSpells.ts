import { useDndFilterStore } from "@/components/spells/Filters/useDndFilterStore";
import { allSpells } from "@/components/spells/spellData/spells";
import {
	dndClasses,
	dndSchools,
	searchableDndTags,
	type Spell,
} from "@/components/spells/spellData/spells.types";
import { useDeferredValue, useMemo } from "react";

export function useFilteredSpells(): Spell[] {
	const { search, classes, schools, tags } = useDndFilterStore();
	const deferredSearch = useDeferredValue(search);
	const deferredClasses = useDeferredValue(classes);
	const deferredSchools = useDeferredValue(schools);
	const deferredTags = useDeferredValue(tags);

	return useMemo(() => {
		// no tags selected = all selected
		if (deferredClasses.length === 0 || deferredSchools.length === 0) {
			return [];
		}

		let result = allSpells;

		if (deferredClasses.length !== dndClasses.length) {
			result = result.filter(
				(spell) => spell.classes.some((dndClass) => deferredClasses.includes(dndClass)),
			);
		}
		if (deferredSchools.length !== dndSchools.length) {
			result = result.filter((spell) => deferredSchools.includes(spell.school));
		}
		if (deferredTags.length > 0 && deferredTags.length !== searchableDndTags.length) {
			result = result.filter((spell) => spell.tags.some((tag) => deferredTags.includes(tag)));
		}

		if (deferredSearch) {
			const lowercaseSearch = deferredSearch.toLowerCase();
			result = result.filter((spell) => spell.filterName.includes(lowercaseSearch));
		}

		return result;
	}, [deferredSearch, deferredClasses, deferredSchools, deferredTags]);
}
