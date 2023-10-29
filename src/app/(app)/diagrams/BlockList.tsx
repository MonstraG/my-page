import type { Dispatch, FC, SetStateAction } from "react";
import { List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from "@mui/joy";
import { renderBlock } from "@/app/(app)/diagrams/diagram.helpers";
import Button from "@mui/joy/Button";
import type { Block } from "@/app/(app)/diagrams/diagrams.types";
import { useResourcesStore } from "@/app/(app)/diagrams/resources";
import { NewBlockDialog } from "@/app/(app)/diagrams/NewBlockDialog";
import { useState } from "react";

const blocksEqual = (a: Block | null, b: Block | null): boolean => {
	if (a == null || b == null) return false;
	return (
		a.input.resource === b.input.resource &&
		a.input.amount === b.input.amount &&
		a.output.resource === b.output.resource &&
		a.output.amount === b.output.amount
	);
};

interface Props {
	blocks: Block[];
	setBlocks: Dispatch<SetStateAction<Block[]>>;
	selectedBlock: Block | null;
	setSelectedBlock: Dispatch<SetStateAction<Block | null>>;
}

export const BlockList: FC<Props> = ({ blocks, setBlocks, selectedBlock, setSelectedBlock }) => {
	const resourcesStore = useResourcesStore();
	const [newBlockDialogOpen, setNewBlockDialogOpen] = useState<boolean>(false);

	const addBlock = (newBlock: Block) => {
		setBlocks((prev) => [...prev, newBlock]);
		resourcesStore.remember(newBlock.input.resource);
		resourcesStore.remember(newBlock.output.resource);
	};

	return (
		<Stack>
			<Typography level="h3">Blocks</Typography>
			<List>
				{blocks.map((block, index) => (
					<ListItem key={index}>
						<ListItemButton
							selected={blocksEqual(selectedBlock, block)}
							onClick={() => {
								setSelectedBlock((prev) => {
									if (blocksEqual(prev, block)) {
										//deselect
										return null;
									}
									return block;
								});
							}}
						>
							<ListItemContent>{renderBlock(block)}</ListItemContent>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Button
				onClick={() => {
					setNewBlockDialogOpen(true);
				}}
				sx={{ alignSelf: "center" }}
			>
				Add block
			</Button>

			<NewBlockDialog
				isOpen={newBlockDialogOpen}
				close={() => {
					setNewBlockDialogOpen(false);
				}}
				addBlock={addBlock}
			/>
		</Stack>
	);
};
