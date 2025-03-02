import styles from "./Snackbar.module.css";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Sheet } from "@/ui/Sheet/Sheet";
import type { FCC } from "@/types/react";
import { clsx } from "clsx";

interface Props {
	open: boolean;
	onClick: () => void;
	severity: "error" | "normal";
}

export const Snackbar: FCC<Props> = ({ open, onClick, severity, children }) => (
	<div
		className={clsx(styles.host, open && styles.open, severity === "error" && styles.error)}
		onClick={onClick}
	>
		<Sheet>
			<Paragraph size="sm">{children}</Paragraph>
		</Sheet>
	</div>
);
