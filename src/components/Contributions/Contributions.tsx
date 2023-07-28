import type { FC } from "react";
import { getContributions } from "@/components/Contributions/getContributions";
import { ContributionTable } from "@/components/Contributions/ContributionTable";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return (
		<div>
			<h2>Contributions table</h2>
			<ContributionTable contributions={contributions} />
			<p>Fetches data from github, re-implemented from scratch.</p>
			<p>And maybe it should have been a table.</p>
		</div>
	);
};
