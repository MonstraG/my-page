import type { FCC } from "@/types/react";
import styles from "./ListItemLink.module.css";
import Link, { type LinkProps } from "next/link";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { clsx } from "clsx";
import type { ReactElement } from "react";

interface Props extends Omit<LinkProps, "legacyBehavior" | "passHref" | "className"> {
	icon?: ReactElement;
	active: boolean;
	size?: ButtonProps["size"];
}

export const ListItemLink: FCC<Props> = ({ icon, children, active, size, ...rest }) => (
	<li>
		<Link {...rest} className={styles.link}>
			<Button
				startDecorator={icon}
				size={size}
				active={active}
				className={clsx(styles.button)}
				alignment="start"
			>
				{children}
			</Button>
		</Link>
	</li>
);
