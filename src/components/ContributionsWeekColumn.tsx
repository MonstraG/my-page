import { FC } from "react";
import { ContributionDayParsed } from "@/components/getContributions";
import styles from "./Contributions.module.css";

type Props = {
	week: ContributionDayParsed[];
	maxContributions: number;
};

export const ContributionsWeekColumn: FC<Props> = ({ week, maxContributions }) => (
	<div className={styles.column}>
		{week.map((day, index) => (
			<div
				key={index}
				className={styles.day}
				style={{
					background: `rgba(0, 255, 0, ${day.contributionCount / maxContributions})`
				}}
			/>
		))}
	</div>
);
