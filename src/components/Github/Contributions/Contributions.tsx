import type { FC } from "react";
import { getContributions } from "@/components/Github/Contributions/getContributions";
import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";
import styles from "@/components/Github/Contributions/Contributions.module.scss";
import { ContributionsTableTooltip } from "@/components/Github/Contributions/ContributionsTableTooltip";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return (
		<>
			<div className={styles.stack}>
				<h2>Contributions table</h2>
				<ContributionsTableTooltip />
			</div>

			<ContributionTable contributions={contributions} />
		</>
	);
};
