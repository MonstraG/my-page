import type { IO } from "@/app/(app)/diagrams/diagrams.types";
import { Card, Stack } from "@mui/joy";
import { renderIO } from "@/app/(app)/diagrams/diagram.helpers";
import type { ReactElement } from "react";

export class Block {
	constructor(inputs: IO[], outputs: IO[]) {
		this.inputs = inputs;
		this.outputs = outputs;
	}

	readonly id: string = crypto.randomUUID();
	readonly inputs: IO[];
	readonly outputs: IO[];

	equal(another: Block | null): boolean {
		if (another == null) return false;
		return this.id === another.id;
	}

	static empty: Block = new Block([], []);

	private static renderIOList(IOlist: IO[]): ReactElement {
		return <>{IOlist.map(renderIO)}</>;
	}

	render() {
		return (
			<Card sx={{ display: "flex" }}>
				<Stack>{Block.renderIOList(this.inputs)}</Stack>
				{"=>"}
				<Stack>{Block.renderIOList(this.outputs)}</Stack>
			</Card>
		);
	}
}
