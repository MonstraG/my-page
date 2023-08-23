import { type CSSProperties, useCallback, useMemo, useRef, useState } from "react";

interface TooltipState<T> {
	anchor: HTMLElement | null;
	context: T | null;
	open: boolean;
	opacity: 0 | 1;
}

const tooltipSpeed = 100;

export interface TooltipControls<T> {
	open: (anchor: HTMLElement, context: T) => void;
	close: () => void;
}

export interface TooltipController<T> {
	context: T | null;
	position: CSSProperties;
	controls: TooltipControls<T>;
}

export const useTooltipController = <T,>(): TooltipController<T> => {
	const [tooltipState, setTooltipState] = useState<TooltipState<T>>({
		anchor: null,
		context: null,
		open: false,
		opacity: 0
	});

	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const position: CSSProperties = (() => {
		if (!tooltipState.anchor) {
			return { display: "none" };
		}
		return {
			left: tooltipState.anchor.offsetLeft,
			top: tooltipState.anchor.offsetTop,
			display: tooltipState.open ? "block" : "none",
			opacity: tooltipState.opacity
		};
	})();

	const open = useCallback((anchor: HTMLElement, context: T) => {
		setTooltipState({ anchor, context, open: true, opacity: 0 });

		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			setTooltipState((prev) => ({ ...prev, opacity: 1 }));
		}, tooltipSpeed);
	}, []);

	const close = useCallback(() => {
		setTooltipState((prev) => ({ ...prev, opacity: 0 }));

		if (timeout.current) {
			clearTimeout(timeout.current);
		}
		timeout.current = setTimeout(() => {
			setTooltipState((prev) => ({ ...prev, open: false, opacity: 0 }));
		}, tooltipSpeed);
	}, []);

	return {
		context: tooltipState.context,
		position,
		controls: useMemo(() => ({ open, close }), [open, close])
	};
};
