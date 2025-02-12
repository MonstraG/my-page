import type { FC } from "react";
import { getContributions } from "@/components/Github/Contributions/getContributions";
import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";
import styles from "./contributions.module.css";
import { Tooltip } from "@/ui/Tooltip/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export const Contributions: FC = async () => {
	const contributions = await getContributions();

	return (
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

			<ContributionTable contributions={contributions} />
		</>
	);
};
