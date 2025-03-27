import { NorthIcon } from "@/icons/material/NorthIcon";
import { SouthIcon } from "@/icons/material/SouthIcon";
import { SwapVertIcon } from "@/icons/material/SwapVertIcon";
import { type ReactElement, useCallback, useState } from "react";

export interface Sort<T> {
	col: keyof T;
	dir: "asc" | "desc";
}

export function getSortDirectionIcon<T>(
	button: string,
	sort: Sort<T>,
): ReactElement {
	if (button === sort.col) {
		if (sort.dir === "asc") {
			return <NorthIcon />;
		} else {
			return <SouthIcon />;
		}
	}
	return <SwapVertIcon />;
}

export function useSort<T>(
	initialSort: Sort<T>,
): { sort: Sort<T>; onSortChange: (key: Sort<T>["col"]) => void } {
	const [sort, setSort] = useState<Sort<T>>(initialSort);

	const onSortChange = useCallback(function handleSortChange(key: Sort<T>["col"]) {
		setSort((prev) => {
			if (prev.col === key) {
				return { col: prev.col, dir: prev.dir === "asc" ? "desc" : "asc" };
			}
			return { col: key, dir: "asc" };
		});
	}, []);

	return { sort, onSortChange };
}

const sortFunctions = {
	string: {
		asc: (a: string, b: string) => a.localeCompare(b),
		desc: (a: string, b: string) => b.localeCompare(a),
	},
	number: {
		asc: (a: number, b: number) => a - b,
		desc: (a: number, b: number) => b - a,
	},
} as const;

function isin<T extends object>(key: PropertyKey, obj: T): key is keyof T {
	return key in obj;
}

export function performSort<T>(array: T[], sort: Sort<T>): T[] {
	if (array.length === 0) {
		return [];
	}

	const sortType = typeof array[0][sort.col];
	if (!isin(sortType, sortFunctions)) {
		throw new Error(`Failed to sort by ${sort.col.toString()}`);
	}

	const sortFunction = sortFunctions[sortType][sort.dir];
	return array.toSorted((a, b) => {
		const valA = a[sort.col];
		const valB = b[sort.col];
		// for some reason, sortFunction resolves to (a: never, b: never) => number,
		// so I have to cast valA and valB for typescript to be happy.
		// I guess that's on me for generifying this to the max.
		return sortFunction(valA as never, valB as never);
	});
}
