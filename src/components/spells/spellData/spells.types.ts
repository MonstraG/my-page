type CardLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SchoolSlug =
	| "evocation"
	| "enchantment"
	| "abjuration"
	| "illusion"
	| "conjuration"
	| "transmutation"
	| "divination"
	| "necromancy";
type SchoolTitle =
	| "Воплощение"
	| "Очарование"
	| "Ограждение"
	| "Иллюзия"
	| "Вызов"
	| "Преобразование"
	| "Прорицание"
	| "Некромантия";
export type SchoolId = 1 | 6 | 5 | 3 | 2 | 7 | 8 | 4;

export interface School {
	slug: SchoolSlug;
	title: SchoolTitle;
	id: SchoolId;
}

export const dndClasses = {
	13: "жрец",
	16: "паладин",
	20: "колдун",
	21: "волшебник",
	22: "друид",
	12: "бард",
	19: "чародей",
	17: "следопыт",
	23: "изобретатель"
};

export const dndArchetypes = {
	143: "круг дикого огня (друид)",
	145: "круг спор (друид)",
	146: "домен бури (жрец)",
	147: "домен войны (жрец)",
	149: "домен знаний (жрец)",
	150: "домен обмана (жрец)",
	151: "домен природы (жрец)",
	154: "домен магии (жрец)",
	155: "домен кузни (жрец)",
	156: "домен упокоения (жрец)",
	158: "домен порядка (жрец)",
	160: "алхимик (изобретатель)",
	162: "боевой кузнец (изобретатель)",
	163: "бронник (изобретатель)",
	165: "исчадие (колдун)",
	166: "Великий Древний (колдун)",
	168: "ведьмовской клинок (колдун)",
	170: "бездонный (колдун)",
	171: "гений (колдун)",
	174: "путь тени (монах)",
	175: "путь четырёх стихий (монах)",
	184: "клятва древних (паладин)",
	186: "клятвопреступник (паладин)",
	187: "клятва короны (паладин)",
	189: "клятва покорения (паладин)",
	190: "клятва славы (паладин)",
	191: "клятва смотрителей (паладин)",
	204: "сумрачный охотник (следопыт)",
	207: "хранитель роя (следопыт)",
	208: "наездник на дрейке (следопыт)",
	211: "божественная душа (чародей)",
	214: "аберрантный разум (чародей)",
	215: "заводная душа (чародей)",
	286: "лунное чародейство (чародей)",
	148: "домен жизни (жрец)",
	152: "домен света (жрец)",
	153: "домен смерти (жрец)",
	157: "домен мира (жрец)",
	159: "домен сумерек (жрец)",
	161: "артиллерист (изобретатель)",
	167: "бессмертный (колдун)",
	169: "небожитель (колдун)",
	172: "нежить (колдун)",
	185: "клятва мести (паладин)",
	188: "клятва искупления (паладин)",
	194: "мистический ловкач (плут)",
	203: "странник горизонта (следопыт)",
	205: "убийца монстров (следопыт)",
	206: "странник фей (следопыт)",
	107: "коллегия духов (бард)",
	135: "магия хронургии (волшебник)",
	136: "магия гравитургии (волшебник)",
	139: "круг земли (друид)",
	144: "круг звёзд (друид)",
	164: "архифея (колдун)",
	183: "клятва преданности (паладин)",
	212: "теневая магия (чародей)",
	179: "путь солнечной души (монах)"
};

export enum CastTimeType {
	Action = 1,
	Reaction = 2,
	BonusAction = 3,
	Minute = 4,
	Hour = 5
}

export const sources = {
	102: "Player's handbook",
	107: "Princes of the Apocalypse",
	109: "Xanathar's Guide to Everything",
	112: "Guildmasters' guide to Ravnica",
	115: "Acquisition Incorporated",
	116: "Explorer's Guide to Wildemount",
	120: "Icewind Dale: Rime of the Frostmaiden",
	117: "Tasha's Cauldron of Everything",
	152: "Fizban's Treasury of Dragons",
	153: "Lost Laboratory of Kwalish",
	155: "Strixhaven: A Curriculum of Chaos",
	160: "Spelljammer: Adventures in Space",
	108: "Sword Coast Adventurer's Guide"
};

export type Components = "В" | "ВС" | "ВСМ" | "ВМ" | "СМ" | "С";

export interface UnparsedSpell {
	id: number;
	t: string;
	tEn: string;
	lvl: CardLevel;
	sch: SchoolId;
	comp: Components;
	cls: keyof typeof dndClasses | (keyof typeof dndClasses)[];
	clsTce?: keyof typeof dndClasses | (keyof typeof dndClasses)[];
	arch?: keyof typeof dndArchetypes | (keyof typeof dndArchetypes)[];
	src: keyof typeof sources | (keyof typeof sources)[];
	con?: 1;
	rit?: boolean;
	time: CastTimeType | "10 минут" | "12 часов" | "8 часов" | "24 часа" | "1 действие или 8 часов";
	trig?: string;
	dist: string;
	dur: string;
	desc: string;
}

export interface Spell {
	id: number;
	title: string;
	titleEn: string;
	level: CardLevel;
	distance: string;
	duration: string;
	description: string;
	schoolId: SchoolId;
	components: Components;
	concentration: boolean;
	ritual: boolean;
	slug: string;
	school: School;
	item_icon: `spell_school_${SchoolSlug}`;
	filterText: string;
	href: string;
	reactionTrigger: string | undefined;

	classes: (keyof typeof dndClasses)[];
	classesTce: (keyof typeof dndClasses)[];
	archetypes: (keyof typeof dndArchetypes)[];
	source: (keyof typeof sources)[];

	searchLabel: string;
	simpleDesc: string;
	castTime: string;
}
