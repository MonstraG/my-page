import type { FC } from "react";
import { getContributions } from "@/components/Github/Contributions/getContributions";
import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";
import { ContributionsTableTooltip } from "@/components/Github/Contributions/ContributionsTableTooltip";
import { Typography, Stack } from "@mui/joy";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return (
		<>
			<Stack direction="row" alignItems="center" gap={1}>
				<Typography level="h2" gutterBottom>
					Contributions table
				</Typography>
				<ContributionsTableTooltip />
			</Stack>

			<ContributionTable contributions={contributions} />
		</>
	);
};
