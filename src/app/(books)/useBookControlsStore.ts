import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type BookFontFamily = "Inter" | "Garamond" | "system sans-serif" | "system serif";

interface BookControlsState {
	wide: boolean;
	justify: boolean;
	fontSize: number;
	fontWeight: number;
	fontFamily: BookFontFamily;
}

const initialState: BookControlsState = {
	wide: false,
	justify: false,
	fontSize: 16,
	fontWeight: 400,
	fontFamily: "Inter"
};

export const useBookControlsStore = create<BookControlsState>()(
	devtools(persist(() => initialState, { name: "book-controls" }))
);
