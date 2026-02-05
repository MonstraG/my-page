/**
 * https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
 */
export function isAborted(error: unknown): error is DOMException {
	return error instanceof DOMException && error.name === "AbortError";
}
