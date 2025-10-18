import type { FCC } from "@/types/react";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { cn } from "@/functions/cn";
import Link, { type LinkProps } from "next/link";
import type { ReactElement } from "react";
import styles from "./ListItemLink.module.css";
import type { Route } from "next";

interface Props extends Omit<LinkProps<Route>, "legacyBehavior" | "passHref" | "className"> {
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
				className={cn(styles.button)}
				alignment="start"
			>
				{children}
			</Button>
		</Link>
	</li>
);
