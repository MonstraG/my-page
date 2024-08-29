import {
	type UnparsedSpell,
	type Spell,
	type SchoolId,
	type School,
	CastTimeType
} from "@/components/spells/spellData/spells.types";

const parseSingleElementArray = <T>(value: T | T[] | undefined): T[] => {
	if (value == null) {
		return [];
	}
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
};

const castTimes: Record<CastTimeType, string> = {
	[CastTimeType.Action]: "1 действие",
	[CastTimeType.Reaction]: "1 реакция",
	[CastTimeType.BonusAction]: "1 бонусное действие",
	[CastTimeType.Minute]: "1 минута",
	[CastTimeType.Hour]: "1 час"
};

export const parseSpell = (spell: UnparsedSpell): Spell => {
	const school = schoolsById[spell.sch];
	const slug = getSpellSlug(spell);

	return {
		id: spell.id,
		title: spell.t,
		titleEn: spell.tEn,
		duration: spell.dur,
		schoolId: spell.sch,
		components: spell.comp,
		description: spell.desc,
		concentration: Boolean(spell.con),
		distance: spell.dist,
		level: spell.lvl,
		reactionTrigger: spell.trig ? spell.trig : undefined,
		slug,
		school,
		ritual: Boolean(spell.rit),
		item_icon: `spell_school_${school.slug}`,
		filterText: `${spell.t.toLowerCase()} ${spell.tEn.toLowerCase()}`,
		href: `https://dnd.su/spells/${slug}`,
		classes: parseSingleElementArray(spell.cls),
		classesTce: parseSingleElementArray(spell.clsTce),
		archetypes: parseSingleElementArray(spell.arch),
		source: parseSingleElementArray(spell.src),
		castTime: typeof spell.time === "string" ? spell.time : castTimes[spell.time],

		searchLabel: spell.t + " " + spell.tEn,
		simpleDesc: spell.desc.replace(/<\/?[^>]+(>|$)/g, "")
	};
};

const getSpellSlug = (spell: UnparsedSpell): string => {
	const slug = spell.tEn
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
