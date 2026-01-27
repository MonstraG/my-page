import { useStorageState } from "@/functions/useStorageState.ts";
import { createLocalStorage } from "@/functions/createLocalStorage.ts";

const storageConfig = createLocalStorage("chat-system-prompt", "", {
	parse: (stored) => stored,
	stringify: (value) => value,
});

export function useSystemPrompt(): readonly [string, (newValue: string) => void] {
	return useStorageState(storageConfig);
}
