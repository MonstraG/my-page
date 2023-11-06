import type { Layer, IO } from "@/app/(app)/diagrams/diagrams.types";
import { Block } from "@/app/(app)/diagrams/Block";
export function getEmptyIO(): IO {
	return { amount: 0, resource: "" };
}

export function renderIO(io: IO) {
	return `${io.amount} ${io.resource}`;
}

export function computeLayerResult(layer: Layer | null | undefined): Block {
	if (layer?.block == null) {
		return Block.empty;
	}

	const outputBlock = new Block([], []);
	outputBlock.inputs.amount = outputBlock.inputs.amount * layer.amount;
	outputBlock.outputs.amount = outputBlock.outputs.amount * layer.amount;
	return new Block([], []);
}
