"use client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/ui/Button/Button";

function getAllEntries(thing: unknown): { key: string; value: unknown }[] {
	if (typeof thing !== "object" || thing == null) {
		return [];
	}

	const entries = [];

	// not just Object.entries because global objects be funny like that
	for (const key in thing) {
		let value: unknown;
		try {
			value = thing[key as keyof typeof thing];
		} catch (_error) {
			value = "got error accessing:";
		}

		entries.push({ key, value });
	}

	return entries.sort((a, b) => a.key.localeCompare(b.key));
}

export const WindowBrowser: FC = () => {
	const [globalObject, setGlobalObject] = useState<unknown>(undefined);
	useEffect(() => {
		setGlobalObject(window);
	}, []);

	if (!globalObject) {
		return undefined;
	}

	return (
		<div style={{ fontFamily: "monospace" }}>
			<RenderEntry el={{ key: "window", value: globalObject }} />
		</div>
	);
};

// biome-ignore lint/complexity/noBannedTypes: literally the type I get from typescript
const RenderFunction: FC<{ value: Function }> = ({ value }) => {
	const [evaluated, setEvaluated] = useState<boolean>(false);
	const [evaluationResult, setEvaluationResult] = useState<unknown>(undefined);
	const [caughtError, setCaughtError] = useState<boolean>(false);
	const [evaluationError, setEvaluationError] = useState<unknown>(undefined);

	if (!evaluated) {
		return (
			<Button
				style={{ display: "inline" }}
				size="sm"
				type="button"
				onClick={() => {
					setEvaluated(true);
					try {
						setEvaluationResult(value());
					} catch (e) {
						setCaughtError(true);
						setEvaluationError(e);
					}
				}}
			>
				Execute function
			</Button>
		);
	}

	if (caughtError) {
		return <RenderValue value={evaluationError} />;
	}

	return <RenderValue value={evaluationResult} />;
};

const RenderObject: FC<{ value: object }> = ({ value }) => {
	const [evaluated, setEvaluated] = useState<boolean>(false);

	if (!evaluated) {
		return (
			<Button
				style={{ display: "inline" }}
				size="sm"
				type="button"
				onClick={() => setEvaluated(true)}
			>
				Evaluate
			</Button>
		);
	}

	return (
		<ul style={{ listStyle: "none" }}>
			{getAllEntries(value).map((el) => (
				<li key={el.key} style={{ minHeight: "30px" }}>
					<RenderEntry el={el} />
				</li>
			))}
		</ul>
	);
};

const RenderValue: FC<{ value: unknown }> = ({ value }) => {
	if (value === null) {
		return "null";
	}
	if (value === undefined) {
		return "undefined";
	}

	if (typeof value === "function") {
		return <RenderFunction value={value} />;
	}

	if (typeof value === "object") {
		if (value instanceof Error) {
			return `${value.name}: ${value.message}`;
		}
		return <RenderObject value={value} />;
	}

	return value?.toString();
};

const RenderEntry: FC<{ el: { key: string; value: unknown } }> = ({ el }) => {
	return (
		<>
			<span>{el.key}: </span>
			<RenderValue value={el.value} />
		</>
	);
};
