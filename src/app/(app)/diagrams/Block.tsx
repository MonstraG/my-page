import type { IO } from "@/app/(app)/diagrams/diagrams.types";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import { renderIO } from "@/app/(app)/diagrams/diagram.helpers";
import type { ReactElement } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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

	private static renderIOList(IOList: IO[]): ReactElement {
		return <>{IOList.map(renderIO)}</>;
	}

	render() {
		return (
			<Card
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 0.5,
					p: 1.5
				}}
			>
				<Stack>{Block.renderIOList(this.inputs)}</Stack>
				<ArrowForwardIcon fontSize="lg" />
				<Stack>{Block.renderIOList(this.outputs)}</Stack>
			</Card>
		);
	}
}
