import type { FCC } from "@/types/react";
import styles from "./ListItemLink.module.css";
import Link, { type LinkProps } from "next/link";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { clsx } from "clsx";

interface Props extends Omit<LinkProps, "legacyBehavior" | "passHref" | "className"> {
	active: boolean;
	size?: ButtonProps["size"];
}

export const ListItemLink: FCC<Props> = ({ children, active, size, ...rest }) => (
	<li>
		<Link {...rest} className={styles.link}>
			<Button size={size} className={clsx(styles.button, active && styles.active)}>
				{children}
			</Button>
		</Link>
	</li>
);
