"use client";
import type { Spell } from "@/components/spells/spellData/spells.types";
import type { FCC } from "@/types/react";
import { createContext, use, useState } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteSpellsState {
	favorites: readonly Spell["id"][];
}

export interface FavoriteSpellsActions {
	toggleSpell: (spell: Spell["id"], isFavoriteNow: boolean) => void;
}

interface FavoriteSpellsStore extends FavoriteSpellsState, FavoriteSpellsActions {}

const initState: FavoriteSpellsState = {
	favorites: [],
};

const createFavoritesStore = () =>
	createStore<FavoriteSpellsStore>()(
		persist(
			(set) => ({
				...initState,
				toggleSpell: (spellId: Spell["id"], isFavoriteNow: boolean) =>
					set((prev) => {
						if (isFavoriteNow) {
							return {
								favorites: prev.favorites.filter((id) => id !== spellId),
							};
						}
						return {
							favorites: prev.favorites.concat(spellId),
						};
					}),
			}),
			{
				name: "dnd-spells-favorites",
				version: 2,
				migrate: () => {
					return initState;
				},
			},
		),
	);

type FavoriteSpellStoreApi = ReturnType<typeof createFavoritesStore>;

const FavoriteSpellStoreContext = createContext<FavoriteSpellStoreApi | null>(null);

export const FavoriteSpellStoreProvider: FCC = ({ children }) => {
	const [store] = useState<FavoriteSpellStoreApi>(createFavoritesStore());

	return (
		<FavoriteSpellStoreContext.Provider value={store}>
			{children}
		</FavoriteSpellStoreContext.Provider>
	);
};

export const useFavoriteSpellsStore = (): FavoriteSpellsStore => {
	const counterStoreContext = use(FavoriteSpellStoreContext);
	if (!counterStoreContext) {
		throw new Error("useFavoriteSpellsStore must be used within FavoriteSpellStoreProvider");
	}

	return useStore(counterStoreContext);
};
