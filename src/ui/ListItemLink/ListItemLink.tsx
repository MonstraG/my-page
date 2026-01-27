import type { FCC } from "@/types/react";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { cn } from "@/functions/cn";
import Link, { type LinkProps } from "next/link";
import styles from "./ListItemLink.module.css";
import type { Route } from "next";

interface ListItemLinkProps {
	linkProps: Omit<LinkProps<Route>, "legacyBehavior" | "passHref" | "children">;
	buttonProps?: ButtonProps;
}

export const ListItemLink: FCC<ListItemLinkProps> = ({ children, linkProps, buttonProps }) => (
	<li>
		<Link {...linkProps} className={cn(styles.link, linkProps.className)}>
			<ListItemButtonCore {...buttonProps}>{children}</ListItemButtonCore>
		</Link>
	</li>
);

export const ListItemButton: FCC<ButtonProps> = (props) => (
	<li>
		<ListItemButtonCore {...props} />
	</li>
);

const ListItemButtonCore: FCC<ButtonProps> = (props) => (
	<Button
		{...props}
		className={cn(styles.button, props.className)}
		alignment={props.alignment ?? "start"}
	>
		{props.children}
	</Button>
);
