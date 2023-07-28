import type { FC } from "react";
import { getContributions } from "@/components/Contributions/getContributions";
import { ContributionTable } from "@/components/Contributions/ContributionTable";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return <ContributionTable contributions={contributions} />;
};
