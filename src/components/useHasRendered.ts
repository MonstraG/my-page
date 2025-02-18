import { useEffect, useState } from "react";

export const useHasRendered = (): boolean => {
	const [rendered, setRendered] = useState<boolean>(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setRendered(true);
		}
	}, []);

	return rendered;
};
