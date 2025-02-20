import styles from "./Snackbar.module.css";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Sheet } from "@/ui/Sheet/Sheet";
import type { FCC } from "@/types/react";
import { clsx } from "clsx";

interface Props {
	open: boolean;
	onClick: () => void;
}

export const Snackbar: FCC<Props> = ({ open, onClick, children }) => (
	<div className={clsx(styles.host, open && styles.open)} onClick={onClick}>
		<Sheet>
			<Paragraph size="sm">{children}</Paragraph>
		</Sheet>
	</div>
);
