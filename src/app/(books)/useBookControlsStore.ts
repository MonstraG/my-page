import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useBookControlsStore = create<{
	wide: boolean;
	justify: boolean;
	fontSize: number;
	fontWeight: number;
	sansSerif: boolean;
}>()(
	devtools(
		persist(
			() => ({
				wide: false as boolean,
				justify: false as boolean,
				fontSize: 16,
				fontWeight: 400,
				sansSerif: false as boolean
			}),
			{
				name: "book-controls"
			}
		)
	)
);
