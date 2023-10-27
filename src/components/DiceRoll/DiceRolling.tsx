"use client";
import { type FC, useState } from "react";
import { Distribution } from "@/components/DiceRoll/Distribution/Distribution";
import { TryRoll } from "@/components/DiceRoll/TryRoll/TryRoll";
import { DiceSelection } from "@/components/DiceRoll/DiceSeletion/DiceSelection";
import { Container, Sheet, Stack, Typography } from "@mui/joy";
import { useScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";

export const DiceRolling: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);

	const [theoryScroll, practiceScroll] = useScrollSync();

	return (
		<Container disableGutters>
			<Sheet sx={{ p: 4, pt: 4, pb: 20, my: 2 }}>
				<Stack spacing={4} component="article">
					<Typography level="h1">Dice rolling</Typography>

					<DiceSelection selectedDice={selectedDice} setSelectedDice={setSelectedDice} />

					<Distribution dice={selectedDice} scrollSync={theoryScroll} />

					<TryRoll dice={selectedDice} scrollSync={practiceScroll} />
				</Stack>
			</Sheet>
		</Container>
	);
};
