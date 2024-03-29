"use client";
import type { NextPage } from "next";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { useState } from "react";
import { FactoryFloor } from "@/app/(app)/diagrams/FactoryFloor";
import { BlockList } from "@/app/(app)/diagrams/BlockList";
import type { Block } from "@/app/(app)/diagrams/Block";

// todo: add selected block to floor
// todo: float input output values

const DiagramsPage: NextPage = () => {
	const [blocks, setBlocks] = useState<Block[]>([]);
	const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

	return (
		<Stack direction="row" sx={{ p: 4, height: "100vh" }}>
			<Sheet variant="outlined" sx={{ width: 300, p: 2 }}>
				<BlockList
					blocks={blocks}
					setBlocks={setBlocks}
					selectedBlock={selectedBlock}
					setSelectedBlock={setSelectedBlock}
				/>
			</Sheet>
			<Sheet variant="outlined" sx={{ flexGrow: 1, minWidth: 0, overflow: "scroll" }}>
				<FactoryFloor selectedBlock={selectedBlock} />
			</Sheet>
		</Stack>
	);
};

export default DiagramsPage;
