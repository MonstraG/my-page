import { FC } from "react";
import { getContributions } from "@/components/getContributions";
import { ContributionsWeekColumn } from "@/components/ContributionsWeekColumn";
import styles from "./Contributions.module.css";

export const Contributions: FC = async () => {
	const data = await getContributions();

	return (
		<div>
			<div className={styles.year}>
				{data.weeks.map((week, index) => (
					<ContributionsWeekColumn
						key={index}
						week={week}
						maxContributions={data.maxContributions}
					/>
				))}
			</div>
		</div>
	);
};
