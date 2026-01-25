"use client";
import type { Sort } from "@/components/spells/Sort/Sort";
import type { Spell } from "@/components/spells/spellData/spells.types";
import {
	createContext,
	type Dispatch,
	type FC,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";

const SpellSortContext = createContext<{
	sort: Sort<Spell>;
	setSort: Dispatch<SetStateAction<Sort<Spell>>>;
} | null>(null);

export const SpellSortContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [sort, setSort] = useState<Sort<Spell>>({ col: "name", dir: "asc" });

	return (
		<SpellSortContext.Provider value={{ sort, setSort }}>{children}</SpellSortContext.Provider>
	);
};

export function useSpellSortContext() {
	const context = useContext(SpellSortContext);
	if (context == null) {
		throw new Error(`Not inside SpellSortContext`);
	}

	return context;
}
