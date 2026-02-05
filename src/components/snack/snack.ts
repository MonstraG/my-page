export const snackEventName = "snack!";

export type SnackSeverity = "normal" | "error";

export function snack(severity: SnackSeverity, content: string): void {
	window.dispatchEvent(new CustomEvent(snackEventName, { detail: { severity, content } }));
}
