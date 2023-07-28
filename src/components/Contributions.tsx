import type { FC } from "react";
import { getContributions } from "@/components/getContributions";
import { ContributionTable } from "@/components/ContributionTable";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return <ContributionTable contributions={contributions} />;
};
