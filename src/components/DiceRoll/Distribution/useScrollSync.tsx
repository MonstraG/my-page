import { type MutableRefObject, useMemo, useRef } from "react";

export interface ScrollSync {
	ref: MutableRefObject<HTMLDivElement | null>;
	onScroll: () => void;
}

export const useScrollSync = (): readonly [ScrollSync, ScrollSync] => {
	const aRef = useRef<HTMLDivElement | null>(null);
	const bRef = useRef<HTMLDivElement | null>(null);

	return useMemo(
		() => [
			{
				ref: aRef,
				onScroll: () => {
					if (aRef.current && bRef.current) {
						bRef.current.scrollLeft = aRef.current.scrollLeft;
					}
				}
			},
			{
				ref: bRef,
				onScroll: () => {
					if (aRef.current && bRef.current) {
						aRef.current.scrollLeft = bRef.current.scrollLeft;
					}
				}
			}
		],
		[]
	);
};
