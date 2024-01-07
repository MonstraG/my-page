import type {
	UnparsedSpell,
	Spell,
	SchoolId,
	School
} from "@/app/(app)/dnd-spells/spells/spells.types";

const parseSingleElementArray = <T>(value: T | T[] | undefined): T[] => {
	if (value == null) {
		return [];
	}
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
};

export const parseSpell = (spell: UnparsedSpell): Spell => {
	const school = schoolsById[spell.schoolId];
	const slug = getSpellSlug(spell);

	return {
		...spell,
		slug,
		school,
		item_icon: `spell_school_${school.slug}`,
		filterText: `${spell.title.toLowerCase()} ${spell.titleEn.toLowerCase()}`,
		href: `https://dnd.su/spells/${slug}`,
		classes: parseSingleElementArray(spell.classes),
		classesTce: parseSingleElementArray(spell.classesTce),
		archetypes: parseSingleElementArray(spell.archetypes),
		source: parseSingleElementArray(spell.source),

		searchLabel: spell.title + " " + spell.titleEn,
		simpleDesc: spell.description.replace(/<\/?[^>]+(>|$)/g, "")
	};
};

const getSpellSlug = (spell: UnparsedSpell): string => {
	const slug = spell.titleEn
		.toLowerCase()
		.replace(/[&/\\#, +()$~%.'":*?<>{}’-]/g, "_")
		.replaceAll("__", "_");
	return `${spell.id}-${slug}`;
};

export const schools: School[] = [
	{
		slug: "evocation",
		title: "Воплощение",
		id: 1
	},
	{
		slug: "enchantment",
		title: "Очарование",
		id: 6
	},
	{
		slug: "abjuration",
		title: "Ограждение",
		id: 5
	},
	{
		slug: "illusion",
		title: "Иллюзия",
		id: 3
	},
	{
		slug: "conjuration",
		title: "Вызов",
		id: 2
	},
	{
		slug: "transmutation",
		title: "Преобразование",
		id: 7
	},
	{
		slug: "divination",
		title: "Прорицание",
		id: 8
	},
	{
		slug: "necromancy",
		title: "Некромантия",
		id: 4
	}
];

const schoolsById: Record<SchoolId, School> = Object.fromEntries(
	schools.map((school) => [school.id, school])
) as Record<SchoolId, School>;
