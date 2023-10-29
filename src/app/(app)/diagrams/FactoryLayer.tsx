import type { FC } from "react";
import type { Block, Layer } from "@/app/(app)/diagrams/diagrams.types";
import { ButtonGroup, Divider, IconButton, Stack, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { computeLayerResult, renderBlock } from "@/app/(app)/diagrams/diagram.helpers";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function newArr(length: number) {
	return Array.from({ length });
}

interface Props {
	layer: Layer;
	layerIndex: number;
	remove: () => void;
	addLayer: () => void;
	selectedBlock: Block | null;
	setLayerBlock: () => void;
	changeBlockAmount: (change: number) => void;
}

export const FactoryLayer: FC<Props> = ({
	layer,
	layerIndex,
	remove,
	addLayer,
	selectedBlock,
	setLayerBlock,
	changeBlockAmount
}) => {
	const layerBlock = layer.block;
	if (layerBlock == null) {
		// pick layer type
		return (
			<Stack justifyContent="center" alignItems="center" px={2}>
				<Typography>
					Layer {layerIndex + 1}{" "}
					<Button onClick={remove} variant="plain" color="neutral">
						remove
					</Button>
				</Typography>
				<Stack justifyContent="center" alignItems="center">
					{selectedBlock == null ? (
						<Typography>Pick block from the block list</Typography>
					) : (
						<Button onClick={setLayerBlock} variant="plain" color="neutral">
							Set this block here
						</Button>
					)}
				</Stack>
				<Button onClick={addLayer}>Add layer to the right</Button>
			</Stack>
		);
	}

	return (
		<Stack justifyContent="center" alignItems="center" px={2}>
			<Typography>
				Layer {layerIndex + 1}{" "}
				<Button onClick={remove} variant="plain" color="neutral">
					remove
				</Button>
			</Typography>
			<Stack justifyContent="center" alignItems="center">
				{newArr(layer.amount).map((_, index) => (
					<Typography key={index}>{renderBlock(layerBlock)}</Typography>
				))}

				<ButtonGroup>
					<IconButton
						disabled={layer.amount === 1}
						onClick={() => {
							changeBlockAmount(-1);
						}}
					>
						<RemoveIcon />
					</IconButton>
					<IconButton
						onClick={() => {
							changeBlockAmount(1);
						}}
					>
						<AddIcon />
					</IconButton>
				</ButtonGroup>

				<Divider />

				<Typography>Layer output</Typography>
				<Typography>{renderBlock(computeLayerResult(layer))}</Typography>
			</Stack>
			<Button onClick={addLayer}>Add layer to the right</Button>
		</Stack>
	);
};
