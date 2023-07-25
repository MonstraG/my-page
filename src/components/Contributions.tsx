import { FC } from "react";
import { getContributions } from "@/components/getContributions";
import { ContributionsTable } from "@/components/ContributionsTable";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return <ContributionsTable contributions={contributions} />;
};
