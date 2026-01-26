import { useStorageState } from "@/functions/useStorageState.ts";
import { createLocalStorage } from "@/functions/createLocalStorage.ts";
import type { Spell } from "@/components/spells/spellData/spells.types.ts";

const storageConfig = createLocalStorage("dnd-favourite-spells", new Set<Spell["id"]>(), {
	parse: (stored) => new Set(JSON.parse(stored)),
	stringify: (value) => JSON.stringify(Array.from(value)),
});

export function useFavouriteSpellsState(): readonly [
	Set<Spell["id"]>,
	(spellId: Spell["id"]) => void,
] {
	const [favourites, setFavourites] = useStorageState(storageConfig);

	const toggleFavourite = (spellId: Spell["id"]) => {
		setFavourites((prev) => {
			const newValue = new Set(prev);

			if (prev.has(spellId)) {
				newValue.delete(spellId);
			} else {
				newValue.add(spellId);
			}

			return newValue;
		});
	};

	return [favourites, toggleFavourite];
}
