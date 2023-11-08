import { type FC, useState } from "react";
import { Stack, Typography, Button } from "@mui/joy";
import type { Factory } from "@/app/(app)/diagrams/diagrams.types";
import { computeLayerResult, renderIO } from "@/app/(app)/diagrams/diagram.helpers";
import { FactoryLayer } from "@/app/(app)/diagrams/FactoryLayer";
import { FactoryLayerColumn } from "@/app/(app)/diagrams/FactoryLayerColumn";
import type { Block } from "@/app/(app)/diagrams/Block";

interface Props {
	selectedBlock: Block | null;
}

export const FactoryFloor: FC<Props> = ({ selectedBlock }) => {
	const [factory, setFactory] = useState<Factory>({
		input: { amount: 0, resource: "" },
		layers: []
	});

	// theoretical
	// todo: also need actual, calculation should go trough all layers
	const outputResultBlock: Block = computeLayerResult(factory.layers.at(-1));

	const addLayer = (newLayerIndex: number) => {
		setFactory((prev) => ({
			...prev,
			layers: prev.layers.toSpliced(newLayerIndex, 0, {
				block: null,
				amount: 1
			})
		}));
	};

	const setLayerBlock = (index: number) => {
		setFactory((prev) => {
			prev.layers[index].block = selectedBlock;
			return {
				...prev,
				layers: [...prev.layers]
			};
		});
	};

	const removeLayer = (index: number) => {
		setFactory((prev) => ({
			...prev,
			layers: prev.layers.toSpliced(index, 1)
		}));
	};

	const changeLayerBlockAmount = (layerIndex: number, change: number) => {
		setFactory((prev) => {
			const layer = prev.layers[layerIndex];
			prev.layers[layerIndex] = { ...layer, amount: layer.amount + change };
			return {
				...prev,
				layers: [...prev.layers]
			};
		});
	};

	return (
		<Stack direction="row" height="100%">
			<FactoryLayerColumn
				title="Factory input"
				footer={
					<Button
						onClick={() => {
							addLayer(0);
						}}
					>
						Add layer to the right
					</Button>
				}
			>
				<Typography>{renderIO(factory.input)}</Typography>
			</FactoryLayerColumn>
			{factory.layers.map((layer, index) => (
				<FactoryLayer
					key={index}
					layer={layer}
					layerIndex={index}
					remove={() => {
						removeLayer(index);
					}}
					addLayer={() => {
						addLayer(index + 1);
					}}
					selectedBlock={selectedBlock}
					setLayerBlock={() => {
						setLayerBlock(index);
					}}
					changeBlockAmount={(change: number) => {
						changeLayerBlockAmount(index, change);
					}}
				/>
			))}
			<FactoryLayerColumn title="Factory output">
				{outputResultBlock.outputs.map((io, index) => (
					<Typography key={index}>{renderIO(io)}</Typography>
				))}
			</FactoryLayerColumn>
		</Stack>
	);
};
