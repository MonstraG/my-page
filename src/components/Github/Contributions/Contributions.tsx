import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";
import { InfoIcon } from "@/icons/material/InfoIcon";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import type { FC } from "react";
import styles from "./contributions.module.css";

export const Contributions: FC = () => (
	<>
		<div className={styles.headerRow}>
			<h2 className={styles.header}>Contributions table</h2>
			<Tooltip
				title={
					<>
						<p>Fetches data from github, re-implemented from scratch.</p>
						<p>And maybe it should have been a table.</p>
					</>
				}
			>
				<InfoIcon />
			</Tooltip>
		</div>

		<ContributionTable />
	</>
);
