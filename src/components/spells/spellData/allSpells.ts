import { freeSpells } from "@/components/spells/spellData/freeSpells";
import { playerHandbookSpells } from "@/components/spells/spellData/playerHandbookSpells";
import type { Spell, UnparsedSpell } from "@/components/spells/spellData/spells.types";

/**
 * NOT PURE.
 * In order to avoid creating several hundred objects, modify in place.
 * @param spells spells to parse
 */
function parseSpells(spells: UnparsedSpell[]): Spell[] {
	for (const spell of spells) {
		const parsedSpell = spell as Spell;
		parsedSpell.filterName = spell.name.toLowerCase();
		if (spell.tags == null) {
			parsedSpell.tags = [];
		}
		if (spell.damage != null) {
			parsedSpell.tags.push("Damage");
		}
	}

	return spells as Spell[];
}

export const allSpells = parseSpells([...freeSpells, ...playerHandbookSpells]);
