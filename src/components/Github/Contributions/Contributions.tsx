import type { FC } from "react";
import { getContributions } from "@/components/Github/Contributions/getContributions";
import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";
import { ContributionsTableTooltip } from "@/components/Github/Contributions/ContributionsTableTooltip";
import styles from "./contributions.module.css";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return (
		<>
			<div className={styles.headerRow}>
				<h2 className={styles.header}>Contributions table</h2>
				<ContributionsTableTooltip />
			</div>

			<ContributionTable contributions={contributions} />
		</>
	);
};
