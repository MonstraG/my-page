import { useDndFiltersContext } from "@/components/spells/Filters/useDndFilterStore";
import { allSpells } from "@/components/spells/spellData/allSpells";
import {
	dndClasses,
	dndSchools,
	dndSources,
	searchableDndTags,
	type Spell,
} from "@/components/spells/spellData/spells.types";
import { useDeferredValue } from "react";

export function useFilteredSpells(): readonly Spell[] {
	const { value } = useDndFiltersContext();
	const deferredSearch = useDeferredValue(value.search);
	const deferredClasses = useDeferredValue(value.classes);
	const deferredSchools = useDeferredValue(value.schools);
	const deferredTags = useDeferredValue(value.tags);
	const deferredSources = useDeferredValue(value.sources);

	// no tags selected = all selected (because spell can have no tags)

	if (
		deferredClasses.length === 0 ||
		deferredSchools.length === 0 ||
		deferredSources.length === 0
	) {
		return [];
	}

	let result = allSpells;

	if (deferredClasses.length !== dndClasses.length) {
		result = result.filter((spell) =>
			spell.classes.some((dndClass) => deferredClasses.includes(dndClass)),
		);
	}
	if (deferredSchools.length !== dndSchools.length) {
		result = result.filter((spell) => deferredSchools.includes(spell.school));
	}
	if (deferredTags.length > 0 && deferredTags.length !== searchableDndTags.length) {
		result = result.filter((spell) => spell.tags.some((tag) => deferredTags.includes(tag)));
	}
	if (deferredSources.length !== dndSources.length) {
		result = result.filter((spell) => deferredSources.includes(spell.source));
	}

	if (deferredSearch) {
		const lowercaseSearch = deferredSearch.toLowerCase();
		result = result.filter((spell) => spell.filterName.includes(lowercaseSearch));
	}

	return result;
}
