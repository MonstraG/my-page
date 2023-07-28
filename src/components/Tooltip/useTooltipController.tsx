import { type CSSProperties, useCallback, useMemo, useState } from "react";

interface TooltipState<T> {
	anchor: HTMLElement | null;
	context: T | null;
}

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
		context: null
	});

	const position: CSSProperties = (() => {
		if (!tooltipState.anchor) {
			return { display: "none" };
		}
		return {
			left: tooltipState.anchor.offsetLeft,
			top: tooltipState.anchor.offsetTop,
			display: "block"
		};
	})();

	const open = useCallback((anchor: HTMLElement, context: T) => {
		setTooltipState({ anchor, context });
	}, []);

	const close = useCallback(() => {
		setTooltipState((p) => ({ anchor: null, context: p.context }));
	}, []);

	return {
		context: tooltipState.context,
		position,
		controls: useMemo(() => ({ open, close }), [open, close])
	};
};
