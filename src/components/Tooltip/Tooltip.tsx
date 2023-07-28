import type { TooltipController } from "@/components/Tooltip/useTooltipController";
import type { FCC } from "@/types/react";
import styles from "@/components/Tooltip/Tooltip.module.scss";

interface Props {
	tooltip: Pick<TooltipController<unknown>, "position">;
}

export const Tooltip: FCC<Props> = ({ tooltip, children }) => (
	<div style={tooltip.position} className={styles.tooltip}>
		<div className={styles.arrow} />
		{children}
	</div>
);
