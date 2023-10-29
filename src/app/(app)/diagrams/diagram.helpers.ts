import type { Block, IO } from "@/app/(app)/diagrams/diagrams.types";

export function renderIO(io: IO) {
	return `${io.amount} ${io.resource}`;
}

export function renderBlock(block: Block) {
	return `${renderIO(block.input)} => ${renderIO(block.output)}`;
}
