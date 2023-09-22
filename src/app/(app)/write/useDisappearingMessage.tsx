import { useCallback, useRef, useState } from "react";

const messageTimeout = 5000;

interface DisappearingMessage {
	shown: boolean;
	appear: () => void;
}

export const useDisappearingMessage = (): DisappearingMessage => {
	const [shown, setShown] = useState<boolean>(false);
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const appear = useCallback(() => {
		setShown(true);

		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(() => {
			setShown(false);
		}, messageTimeout);
	}, []);

	return { shown, appear };
};
