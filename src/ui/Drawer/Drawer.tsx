import styles from "./Drawer.module.css";
import type { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";
import sheetStyles from "@/ui/Sheet/Sheet.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	open: boolean;
}

export const Drawer: FC<Props> = ({ className, open, ...rest }) => (
	<aside
		className={clsx(sheetStyles.sheet, styles.drawer, open && styles.open, className)}
		{...rest}
	/>
);
