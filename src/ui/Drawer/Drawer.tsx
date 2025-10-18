import { Sheet } from "@/ui/Sheet/Sheet";
import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes } from "react";
import styles from "./Drawer.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	open: boolean;
}

export const Drawer: FC<Props> = ({ className, open, children, ...rest }) => (
	<aside className={cn(styles.drawer, open && styles.open, className)} {...rest}>
		<Sheet className={styles.drawerSheet}>{children}</Sheet>
	</aside>
);
