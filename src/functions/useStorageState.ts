import { type Dispatch, type SetStateAction, useSyncExternalStore } from "react";
import { lazyApplySetStateAction } from "@/functions/applySetStateAction.ts";

const eventName = "storage-state-event";

export interface StorageConfig<T> {
	name: string;
	defaultValue: T;
	parse: (stored: string) => T;
	stringify: (value: T) => string;
	setStoredValue: (stored: string) => void;
	getStoredValue: () => string | null;
}

interface StorageStateEventDetail {
	name: string;
	newValue: string;
}

function isStorageEvent(event: Event): event is CustomEvent<StorageStateEventDetail> {
	if (!("detail" in event)) {
		return false;
	}
	const detail = event.detail;

	return (
		detail != null &&
		typeof detail === "object" &&
		"name" in detail &&
		"newValue" in detail &&
		typeof detail.name === "string" &&
		typeof detail.newValue === "string"
	);
}

export function useStorageState<T extends object>({
	defaultValue,
	getStoredValue,
	name,
	parse,
	setStoredValue,
	stringify,
}: StorageConfig<T>): readonly [T, Dispatch<SetStateAction<T>>] {
	const serializedDefault = stringify(defaultValue);

	function getSnapshot(): string {
		const stored = getStoredValue();
		try {
			if (stored == null) {
				return serializedDefault;
			}
			return stored;
		} catch (error) {
			console.warn("Failed to parse stored value in storage state", {
				name,
				stored,
				error,
			});
			return serializedDefault;
		}
	}

	const snapshot = useSyncExternalStore<string>(
		(callback) => {
			const abortController = new AbortController();
			addEventListener(
				eventName,
				(event: Event) => {
					if (!isStorageEvent(event)) {
						return;
					}
					if (event.detail.name !== name) {
						return;
					}

					callback();
				},
				{ signal: abortController.signal },
			);
			return () => abortController.abort();
		},
		getSnapshot,
		() => serializedDefault,
	);

	function setValue(value: SetStateAction<T>) {
		const getPrev = () => {
			return parse(getSnapshot());
		};

		const newValue = lazyApplySetStateAction(getPrev, value);

		const stringified = stringify(newValue);
		setStoredValue(stringified);
		dispatchEvent(
			new CustomEvent<StorageStateEventDetail>(eventName, {
				detail: {
					name,
					newValue: stringified,
				},
			}),
		);
	}

	return [parse(snapshot), setValue];
}
