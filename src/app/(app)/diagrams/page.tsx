"use client";
import type { NextPage } from "next";
import {
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemContent,
	Sheet,
	Stack,
	Typography
} from "@mui/joy";
import React, { useState } from "react";
import Button from "@mui/joy/Button";
import type { Block } from "@/app/(app)/diagrams/diagrams.types";
import { NewBlockDialog } from "@/app/(app)/diagrams/NewBlockDialog";
import { useResourcesStore } from "@/app/(app)/diagrams/resources";

function renderBlockName(block: Block) {
	return `${block.input.amount} ${block.input.resource} => ${block.output.amount} ${block.output.resource}`;
}

const DiagramsPage: NextPage = () => {
	const [blocks, setBlocks] = useState<Block[]>([]);

	const resourcesStore = useResourcesStore();

	const [newBlockDialogOpen, setNewBlockDialogOpen] = useState<boolean>(false);
	const addBlock = (newBlock: Block) => {
		setBlocks((prev) => [...prev, newBlock]);
		resourcesStore.remember(newBlock.input.resource);
		resourcesStore.remember(newBlock.output.resource);
	};

	return (
		<>
			<Sheet sx={{ m: 4 }}>
				<Stack direction="row">
					<Sheet variant="outlined" sx={{ maxWidth: 300 }}>
						<Stack>
							<Typography level="h3">Blocks</Typography>
							<List>
								{blocks.map((block, index) => (
									<ListItem key={index}>
										<ListItemButton>
											<ListItemContent>
												{renderBlockName(block)}
											</ListItemContent>
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
						</Stack>
					</Sheet>
					<Sheet
						variant="outlined"
						sx={{ flexGrow: 1, minWidth: 300, overflowX: "scroll" }}
					></Sheet>
				</Stack>
			</Sheet>
			<NewBlockDialog
				isOpen={newBlockDialogOpen}
				close={() => {
					setNewBlockDialogOpen(false);
				}}
				addBlock={addBlock}
			/>
		</>
	);
};

export default DiagramsPage;
