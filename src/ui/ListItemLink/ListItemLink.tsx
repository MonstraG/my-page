import type { FCC } from "@/types/react";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { clsx } from "clsx";
import Link, { type LinkProps } from "next/link";
import type { ReactElement } from "react";
import styles from "./ListItemLink.module.css";

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
