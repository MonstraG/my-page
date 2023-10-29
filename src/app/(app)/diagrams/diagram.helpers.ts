import type { Layer, Block, IO } from "@/app/(app)/diagrams/diagrams.types";

export function getEmptyIO(): IO {
	return { amount: 0, resource: "" };
}

export function getEmptyBlock(): Block {
	return {
		input: getEmptyIO(),
		output: getEmptyIO()
	};
}

export function renderIO(io: IO) {
	return `${io.amount} ${io.resource}`;
}

export function renderBlock(block: Block) {
	return `${renderIO(block.input)} => ${renderIO(block.output)}`;
}

export function computeLayerResult(layer: Layer | null | undefined): Block {
	if (layer?.block == null) {
		return getEmptyBlock();
	}

	const outputBlock = structuredClone(layer.block);
	outputBlock.input.amount = outputBlock.input.amount * layer.amount;
	outputBlock.output.amount = outputBlock.output.amount * layer.amount;
	return outputBlock;
}
