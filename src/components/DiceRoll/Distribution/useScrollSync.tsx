import { type MutableRefObject, type RefCallback, useMemo, useRef } from "react";

const copyScroll = (
	from: MutableRefObject<HTMLDivElement | null>,
	to: MutableRefObject<HTMLDivElement | null>
) => {
	if (from.current && to.current) {
		to.current.scrollLeft = from.current.scrollLeft;
	}
};

export interface ScrollSync {
	ref: RefCallback<HTMLDivElement | null>;
	onScroll: () => void;
}

export const useScrollSync = (): readonly [ScrollSync, ScrollSync] => {
	const aRef = useRef<HTMLDivElement | null>(null);
	const bRef = useRef<HTMLDivElement | null>(null);

	return useMemo(() => {
		const propsForA: ScrollSync = {
			ref: (el) => {
				aRef.current = el;
				copyScroll(bRef, aRef);
			},
			onScroll: () => {
				copyScroll(aRef, bRef);
			}
		};
		const propsForB: ScrollSync = {
			ref: (el) => {
				bRef.current = el;
				copyScroll(aRef, bRef);
			},
			onScroll: () => {
				copyScroll(bRef, aRef);
			}
		};

		return [propsForA, propsForB];
	}, []);
};
