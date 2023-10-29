import { type FC, useState } from "react";
import { Stack, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import type { Factory } from "@/app/(app)/diagrams/diagrams.types";
import { renderBlock, renderIO } from "@/app/(app)/diagrams/diagram.helpers";

export const FactoryFloor: FC = () => {
	const [factory, setFactory] = useState<Factory>({
		input: { amount: 0, resource: "" },
		layers: [],
		output: { amount: 0, resource: "" }
	});

	return (
		<Stack direction="row">
			<Stack justifyContent="center" alignItems="center">
				<Typography>Factory input</Typography>
				<Typography>{renderIO(factory.input)}</Typography>

				<Button
					onClick={() => {
						setFactory((prev) => ({
							...prev,
							layers: prev.layers.toSpliced(0, 0, {
								blocks: []
							})
						}));
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
							setFactory((prev) => ({
								...prev,
								layers: prev.layers.toSpliced(index, 0, {
									blocks: []
								})
							}));
						}}
					>
						Add layer to the right
					</Button>
				</Stack>
			))}
			<Stack justifyContent="center" alignItems="center">
				<Typography>Factory input</Typography>
				<Typography>{renderIO(factory.output)}</Typography>
			</Stack>
		</Stack>
	);
};
