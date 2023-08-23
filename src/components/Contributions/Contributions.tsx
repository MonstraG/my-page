import type { FC } from "react";
import { getContributions } from "@/components/Contributions/getContributions";
import { ContributionTable } from "@/components/Contributions/ContributionTable";
import styles from "./Contributions.module.scss";
import { ContributionsTableTooltip } from "@/components/Contributions/ContributionsTableTooltip";

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
