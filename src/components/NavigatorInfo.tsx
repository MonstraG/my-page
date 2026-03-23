"use client";
import type { FC } from "react";
import { useEffect, useState } from "react";

function readAllProps(thing: unknown) {
	if (typeof thing !== "object" || thing == null) {
		return undefined;
	}

	const result: Record<string | number | symbol, unknown> = {};
	for (const key in thing) {
		try {
			result[key] = thing[key as keyof typeof thing];
		} catch (_error) {
			result[key] = "[unreadable]";
		}
	}

	return result;
}

export const NavigatorInfo: FC = () => {
	const [info, setInfo] = useState<string>("");
	useEffect(() => {
		setInfo(JSON.stringify(readAllProps(navigator), null, 4));
	}, []);

	return <pre>{info}</pre>;
};
