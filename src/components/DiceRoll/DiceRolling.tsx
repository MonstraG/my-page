"use client";
import { type FC, useState } from "react";
import { Distribution } from "@/components/DiceRoll/Distribution/Distribution";
import { TryRoll } from "@/components/DiceRoll/TryRoll/TryRoll";
import { DiceSelection } from "@/components/DiceRoll/DiceSeletion/DiceSelection";
import { Container, Sheet, Stack, Typography } from "@mui/joy";

export const DiceRolling: FC = () => {
	const [selectedDice, setSelectedDice] = useState<number[]>([]);

	return (
		<Container disableGutters>
			<Sheet sx={{ p: 4, pt: 4, mt: 4, pb: 20 }}>
				<Stack spacing={4} component="article">
					<Typography level="h1">Dice rolling</Typography>

					<DiceSelection selectedDice={selectedDice} setSelectedDice={setSelectedDice} />

					<Distribution dice={selectedDice} />

					<TryRoll dice={selectedDice} />
				</Stack>
			</Sheet>
		</Container>
	);
};
