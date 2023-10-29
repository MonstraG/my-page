import type { Dispatch, FC, SetStateAction } from "react";
import { List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from "@mui/joy";
import { renderBlock } from "@/app/(app)/diagrams/diagram.helpers";
import Button from "@mui/joy/Button";
import type { Block } from "@/app/(app)/diagrams/diagrams.types";
import { useResourcesStore } from "@/app/(app)/diagrams/resources";
import { NewBlockDialog } from "@/app/(app)/diagrams/NewBlockDialog";
import { useState } from "react";

interface Props {
	blocks: Block[];
	setBlocks: Dispatch<SetStateAction<Block[]>>;
}

export const BlockList: FC<Props> = ({ blocks, setBlocks }) => {
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
						<ListItemButton>
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
