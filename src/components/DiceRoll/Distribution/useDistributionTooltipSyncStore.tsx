import { create } from "zustand";

export const useDistributionTooltipSyncStore = create<{ open: number | null }>(() => ({
	open: null,
}));
