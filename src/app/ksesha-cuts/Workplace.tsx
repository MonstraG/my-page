import workplaceStyles from "@/app/ksesha-cuts/Workplace.module.css";
import styles from "@/app/ksesha-cuts/page.module.css";
import { FC, ReactNode } from "react";

type Props = {
	workplace: ReactNode;
	position: string;
	period: string;
	description?: ReactNode;
};

export const Workplace: FC<Props> = ({ workplace, position, period, description }) => (
	<div className={workplaceStyles.container}>
		<h3 className={`${workplaceStyles.title} ${styles.primary}`}>{workplace}</h3>
		<div>
			<div className={workplaceStyles.positionSection}>
				<div className={workplaceStyles.positionName}>{position}</div>
				<div className={styles.secondary}>{period}</div>
			</div>
			{description && <p className={styles.secondary}>{description}</p>}
		</div>
	</div>
);
