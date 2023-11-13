import type { FC } from "react";
import type { Layer } from "@/app/(app)/diagrams/diagrams.types";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { computeLayerResult } from "@/app/(app)/diagrams/diagram.helpers";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FactoryLayerColumn } from "@/app/(app)/diagrams/FactoryLayerColumn";
import type { Block } from "@/app/(app)/diagrams/Block";
import { Fragment } from "react";

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
		return (
			<FactoryLayerColumn
				title={`Layer ${layerIndex + 1}`}
				onRemove={remove}
				footer={<Button onClick={addLayer}>Add layer to the right</Button>}
			>
				{selectedBlock == null ? (
					<Typography>Pick block from the block list</Typography>
				) : (
					<Button onClick={setLayerBlock} variant="plain" color="neutral">
						Set this block here
					</Button>
				)}
			</FactoryLayerColumn>
		);
	}

	return (
		<FactoryLayerColumn
			title={`Layer ${layerIndex + 1}`}
			onRemove={remove}
			footer={<Button onClick={addLayer}>Add layer to the right</Button>}
		>
			<Stack gap={2} alignItems="center">
				<Typography>Blocks</Typography>

				{newArr(layer.amount).map((_, index) => (
					<Fragment key={index}>{layerBlock.render()}</Fragment>
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
				<Typography>{computeLayerResult(layer).render()}</Typography>
			</Stack>
		</FactoryLayerColumn>
	);
};
