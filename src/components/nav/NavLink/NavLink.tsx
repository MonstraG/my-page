import type { FCC } from "@/types/react";
import styles from "./NavLink.module.css";
import Link, { type LinkProps } from "next/link";
import { Button } from "@/ui/Button/Button";
import { clsx } from "clsx";

interface Props extends Omit<LinkProps, "legacyBehavior" | "passHref" | "className"> {
	active: boolean;
}

export const NavLink: FCC<Props> = ({ children, active, ...rest }) => (
	<Link {...rest} className={styles.link}>
		<Button className={clsx(styles.button, active && styles.active)}>{children}</Button>
	</Link>
);
