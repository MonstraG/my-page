import { CloseIcon } from "@/icons/material/CloseIcon";
import type { FCC } from "@/types/react";
import { Button } from "@/ui/Button/Button";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import { clsx } from "clsx";
import styles from "./Snackbar.module.css";

interface Props {
	open: boolean;
	handleCloseClick: () => void;
	severity: "error" | "normal";
}

export const Snackbar: FCC<Props> = ({ open, handleCloseClick, severity, children }) => (
	<div className={clsx(styles.host, open && styles.open)}>
		<Sheet className={severity === "error" ? styles.error : undefined}>
			<Stack direction="row" gap={1} style={{ alignItems: "start" }}>
				<Paragraph size="sm" style={{ flexGrow: 1 }}>{children}</Paragraph>
				<Button size="sm" square onClick={handleCloseClick}>
					<CloseIcon />
				</Button>
			</Stack>
		</Sheet>
	</div>
);
