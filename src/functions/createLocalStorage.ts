import type { StorageConfig } from "@/functions/useStorageState";

export function createLocalStorage<T>(
	name: string,
	defaultValue: T,
	storage?: {
		parse: (stored: string) => T;
		stringify: (value: T) => string;
	},
): StorageConfig<T> {
	const isServer = typeof window === "undefined";

	const parse = storage?.parse ?? JSON.parse;
	const stringify = storage?.stringify ?? JSON.stringify;

	const getStoredValue = () => {
		if (isServer) {
			return stringify(defaultValue);
		}

		return localStorage.getItem(name);
	};

	const setStoredValue = (value: string) => {
		if (isServer) {
			throw new Error(`Can't store on the server! Store name=${name}`);
		}
		return localStorage.setItem(name, value);
	};

	return {
		name,
		defaultValue,
		parse,
		stringify,
		getStoredValue,
		setStoredValue,
	};
}
