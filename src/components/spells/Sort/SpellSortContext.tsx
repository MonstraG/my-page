"use client";
import type { Sort } from "@/components/spells/Sort/Sort";
import type { Spell } from "@/components/spells/spellData/spells.types";
import { createStateContext } from "@/functions/createSimpleContext.tsx";

const context = createStateContext<Sort<Spell>>({ col: "name", dir: "asc" });

export const SpellSortContextProvider = context.Provider;

export const useSpellSortContext = context.useContextHook;
