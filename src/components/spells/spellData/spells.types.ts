export const schools = [
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

export type DndClass = typeof dndClasses[number];
export type School = typeof schools[number];
export type Attribute = typeof attributes[number];
export type DamageType = typeof damageTypes[number];

export type Components = "VS" | "VSM" | "V" | "S" | "VM" | "SM";

export interface Spell {
	id: number;
	name: string;
	level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	school: School;
	components: Components;
	classes: DndClass[];
	concentration?: true;
	ritual?: true;
	save?: Attribute; // fixme
	damage?: `${number}d${number}`;
	range?:
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
		| { value: number; unit: "hour" | "minute" }
		| "Action"
		| "Bonus Action"
		| "Reaction"
		| "Special";
	spellAttack: "None" | "Ranged" | "Melee"; // fixme deleteme
	description: string;
	tags: string; // fixme deleteme
	upcast?: true;
	aoeRange?: string; // maybe fixme
	onHigherLevels?: string;
	damageType?: DamageType[];
	material?: string;
	["data-AttackType"]?: "Spell Attack";
}
