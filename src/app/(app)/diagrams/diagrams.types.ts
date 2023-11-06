import type { Block } from "@/app/(app)/diagrams/diagram.helpers";

export interface IO {
	amount: number;
	resource: string;
}

export interface Factory {
	input: IO;
	layers: Layer[];
}

export interface Layer {
	block: Block | null;
	amount: number;

	// todo: split layer into 2
	// todo: together with
	// `nextLayer: Layer[]`
}
