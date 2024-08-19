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
			// eslint-disable-next-line react-compiler/react-compiler -- https://github.com/facebook/react/issues/30745
			ref: (el) => {
				aRef.current = el;
				copyScroll(bRef, aRef);
			},
			// eslint-disable-next-line react-compiler/react-compiler -- https://github.com/facebook/react/issues/30745
			onScroll: () => {
				copyScroll(aRef, bRef);
			}
		};
		const propsForB: ScrollSync = {
			// eslint-disable-next-line react-compiler/react-compiler -- https://github.com/facebook/react/issues/30745
			ref: (el) => {
				bRef.current = el;
				copyScroll(aRef, bRef);
			},
			// eslint-disable-next-line react-compiler/react-compiler -- https://github.com/facebook/react/issues/30745
			onScroll: () => {
				copyScroll(bRef, aRef);
			}
		};

		return [propsForA, propsForB];
	}, []);
};
