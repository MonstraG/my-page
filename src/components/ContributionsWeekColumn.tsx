import { FC } from "react";
import { ContributionWeek } from "@/components/getContributions";
import styles from "./Contributions.module.css";

type Props = {
	week: ContributionWeek;
	maxContributions: number;
};

export const ContributionsWeekColumn: FC<Props> = ({ week, maxContributions }) => {
	return (
		<div className={styles.column}>
			{week.contributionDays.map((day, index) => {
				const brightness = day.contributionCount / maxContributions;

				return (
					<div
						key={index}
						className={styles.day}
						style={{ background: `rgba(0, 255, 0, ${brightness})` }}
					/>
				);
			})}
		</div>
	);
};
