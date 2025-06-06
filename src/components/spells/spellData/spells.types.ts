export const dndSchools = [
	"Evocation",
	"Abjuration",
	"Transmutation",
	"Enchantment",
	"Necromancy",
	"Divination",
	"Illusion",
	"Conjuration",
] as const;

export const dndClasses = [
	"Sorcerer",
	"Wizard",
	"Bard",
	"Cleric",
	"Druid",
	"Paladin",
	"Ranger",
	"Warlock",
] as const;

export const attributes = [
	"Dexterity",
	"Wisdom",
	"Charisma",
	"Intelligence",
	"Constitution",
	"Strength",
] as const;

export const damageTypes = [
	"Acid",
	"Bludgeoning",
	"Slashing",
	"Piercing",
	"Psychic",
	"Force",
	"Necrotic",
	"Fire",
	"Lightning",
	"Cold",
	"Poison",
	"Thunder",
	"Radiant",
] as const;

export const dndConditions = [
	"Charmed",
	"Frightened",
	"Incapacitated",
	"Blinded",
	"Deafened",
	"Poisoned",
	"Restrained",
	"Stunned",
	"Prone",
	"Unconscious",
	"Paralyzed",
] as const;

export const usefulTags = [
	"Healing",
	"Utility",
	"Buff",
	"Debuff",
	"Inflict Condition",
	"Remove Condition",
	"Minions",
	"Attack vs AC",
	"Teleportation",
] as const;

const unparsedTags = [
	...usefulTags,
	...dndConditions,
] as const;

const _dndTags = [
	...unparsedTags,
	"Damage",
] as const;

export const searchableDndTags = [
	"Damage",
	...usefulTags,
] as const;

export type DndClass = typeof dndClasses[number];
export type DndSchool = typeof dndSchools[number];
export type Attribute = typeof attributes[number];
export type DamageType = typeof damageTypes[number];
export type RawDndTag = typeof unparsedTags[number];
export type DndTag = typeof _dndTags[number];

export type Components = "VS" | "VSM" | "V" | "S" | "VM" | "SM";

export const dndSources = [
	"D&D Free Rules",
	"Player’s Handbook",
] as const;

export type DndSource = typeof dndSources[number];

export interface UnparsedSpell {
	id: number;
	name: string;
	level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	school: DndSchool;
	components: Components;
	classes: readonly DndClass[];
	concentration?: true;
	ritual?: true;
	save?: Attribute;
	damage?: {
		value: `${number}d${number}` | number;
		type: readonly DamageType[];
	};
	range:
		| { value: number; unit: "ft" | "miles" }
		| "Touch"
		| "Self"
		| "Special"
		| "Sight"
		| "Unlimited";
	duration:
		| { value: number; unit: "hour" | "minute" | "day" | "round" }
		| "Instant"
		| "Until dispelled"
		| "Until dispelled or triggered"
		| "Special";
	castingTime:
		| { value: number; unit: "hour" | "minute" | "reaction" }
		| "Action"
		| "Bonus Action"
		| "Reaction"
		| "Special";
	spellAttack?: "Ranged" | "Melee";
	description: string;
	tags?: readonly RawDndTag[];
	aoeRange?: string;
	onHigherLevels?: string;
	material?: string;
	source: DndSource;
}

export interface Spell extends Omit<UnparsedSpell, "tags"> {
	/**
	 * Lowercase version of the name, ready for searching by
	 */
	filterName: string;
	tags: DndTag[];
}
