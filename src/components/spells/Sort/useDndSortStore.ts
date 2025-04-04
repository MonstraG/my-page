import type { Sort } from "@/components/spells/Sort/Sort";
import { type Spell } from "@/components/spells/spellData/spells.types";
import { create } from "zustand";

export const useDndSortStore = create<Sort<Spell>>(() => ({ col: "name", dir: "asc" }));
