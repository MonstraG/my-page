"use client";
import { type FC, useState } from "react";
import { Distribution } from "@/components/DiceRoll/Distribution/Distribution";
import { TryRoll } from "@/components/DiceRoll/TryRoll/TryRoll";
import { DiceSelection } from "@/components/DiceRoll/DiceSeletion/DiceSelection";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import type { RollMode } from "@/components/DiceRoll/Distribution/RollModes";

export const DiceRolling: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);
	const [rollMode, setRollMode] = useState<RollMode>("sum");

	const [theoryScroll, practiceScroll] = useScrollSync();

	return (
		<Container maxWidth="lg">
			<Stack spacing={4} component="article" sx={{ pt: 4, pb: 20 }}>
				<Typography level="h1">Dice rolling</Typography>

				<DiceSelection selectedDice={selectedDice} setSelectedDice={setSelectedDice} />

				<Distribution
					dice={selectedDice}
					scrollSync={theoryScroll}
					rollMode={rollMode}
					setRollMode={setRollMode}
				/>

				<TryRoll dice={selectedDice} scrollSync={practiceScroll} rollMode={rollMode} />
			</Stack>
		</Container>
	);
};
