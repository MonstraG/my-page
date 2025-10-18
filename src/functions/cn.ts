/**
 * Based on https://github.com/lukeed/clsx
 */
export function cn(...classNames: (string | false | undefined | null | 0 | 0n)[]): string {
	let result = "";
	for (const className of classNames) {
		if (className) {
			// && for leading space
			result = result + (result && " ") + className;
		}
	}

	return result;
}
