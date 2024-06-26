import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useBookControlsStore = create<{ wide: boolean; fontSize: number }>()(
	devtools(
		persist(
			() => ({
				wide: false as boolean,
				fontSize: 20
			}),
			{
				name: "book-controls"
			}
		)
	)
);
