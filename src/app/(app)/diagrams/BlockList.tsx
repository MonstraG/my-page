import type { Dispatch, FC, SetStateAction } from "react";
import { List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from "@mui/joy";
import { Block, renderBlock } from "@/app/(app)/diagrams/diagram.helpers";
import Button from "@mui/joy/Button";
import { useResourcesStore } from "@/app/(app)/diagrams/resources";
import { NewBlockDialog } from "@/app/(app)/diagrams/NewBlockDialog";
import { useState } from "react";

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

		newBlock.inputs
			.concat(newBlock.outputs)
			.map((io) => io.resource)
			.forEach((resource) => {
				resourcesStore.remember(resource);
			});
	};

	return (
		<Stack>
			<Typography level="h3">Blocks</Typography>

			{blocks.length === 0 && (
				<Typography>Blocks list is empty, add new blocks with a button below</Typography>
			)}

			<List>
				{blocks.map((block, index) => (
					<ListItem key={index}>
						<ListItemButton
							selected={block.equal(selectedBlock)}
							onClick={() => {
								setSelectedBlock((prev) => {
									if (block.equal(prev)) {
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
