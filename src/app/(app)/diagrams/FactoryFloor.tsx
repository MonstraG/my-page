import { type FC, useState } from "react";
import { Stack, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import type { Block, Factory, IO, Layer } from "@/app/(app)/diagrams/diagrams.types";
import { renderBlock, renderIO } from "@/app/(app)/diagrams/diagram.helpers";

interface Props {
	selectedBlock: Block | null;
}

export const FactoryFloor: FC<Props> = ({ selectedBlock }) => {
	const [factory, setFactory] = useState<Factory>({
		input: { amount: 0, resource: "" },
		layers: []
	});

	// todo: compute from layers
	const output: IO = { amount: 0, resource: "" };

	const addBlock = (layerIndex: number) => {
		setFactory((prev) => {
			prev.layers[layerIndex].block.push(selectedBlock);
			return {
				...prev,
				layers: [...prev.layers]
			};
		});
	};

	const addLayer = (newLayerIndex: number) => {
		setFactory((prev) => ({
			...prev,
			layers: prev.layers.toSpliced(newLayerIndex, 0, {
				blocks: []
			})
		}));
	};

	return (
		<Stack direction="row">
			<Stack justifyContent="center" alignItems="center">
				<Typography>Factory input</Typography>
				<Typography>{renderIO(factory.input)}</Typography>

				<Button
					onClick={() => {
						addLayer(0);
					}}
				>
					Add layer to the right
				</Button>
			</Stack>
			{factory.layers.map((layer, index) => (
				<Stack justifyContent="center" alignItems="center" key={index}>
					<Typography>
						Layer {index + 1}{" "}
						<Button
							onClick={() => {
								setFactory((prev) => ({
									...prev,
									layers: prev.layers.toSpliced(index, 1)
								}));
							}}
							variant="plain"
							color="neutral"
						>
							remove
						</Button>
					</Typography>
					<Stack justifyContent="center" alignItems="center" key={index}>
						{layer.blocks.map((block, index) => (
							<Typography key={index}>{renderBlock(block)}</Typography>
						))}
						<Typography>{renderIO(factory.output)}</Typography>
					</Stack>
					<Button
						onClick={() => {
							addLayer(index + 1);
						}}
					>
						Add layer to the right
					</Button>
				</Stack>
			))}
			<Stack justifyContent="center" alignItems="center">
				<Typography>Factory input</Typography>
				<Typography>{renderIO(output)}</Typography>
			</Stack>
		</Stack>
	);
};
