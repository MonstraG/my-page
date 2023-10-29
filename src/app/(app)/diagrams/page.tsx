"use client";
import type { NextPage } from "next";
import { Sheet, Stack } from "@mui/joy";
import React, { useState } from "react";
import type { Block } from "@/app/(app)/diagrams/diagrams.types";
import { FactoryFloor } from "@/app/(app)/diagrams/FactoryFloor";
import { BlockList } from "@/app/(app)/diagrams/BlockList";

const DiagramsPage: NextPage = () => {
	const [blocks, setBlocks] = useState<Block[]>([]);

	return (
		<>
			<Sheet sx={{ m: 4 }}>
				<Stack direction="row">
					<Sheet variant="outlined" sx={{ width: 300 }}>
						<BlockList blocks={blocks} setBlocks={setBlocks} />
					</Sheet>
					<Sheet
						variant="outlined"
						sx={{ flexGrow: 1, minWidth: 300, overflowX: "scroll" }}
					>
						<FactoryFloor />
					</Sheet>
				</Stack>
			</Sheet>
		</>
	);
};

export default DiagramsPage;
