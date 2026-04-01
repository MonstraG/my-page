import type { FCC } from "@/types/react";
import { cn } from "@/functions/cn";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import styles from "./MyLink.module.css";
import type { Route } from "next";
import { LinkOut } from "@/components/LinkOut";

interface MyLinkProps {
	href: LinkProps<Route>["href"];
	className?: AnchorHTMLAttributes<HTMLAnchorElement>["className"];
	color?: "text-color" | "inherit";
	size?: "sm";
}

export const MyLink: FCC<MyLinkProps> = ({ color, size, className, ...rest }) => (
	<Link
		className={cn(
			styles.link,
			color === "text-color" && styles.textColor,
			color === "inherit" && styles.inheritColor,
			size === "sm" && styles.small,
			className,
		)}
		{...rest}
	/>
);

export const MyLinkOut: FCC<Omit<MyLinkProps, "href" | "rel"> & { href: string }> = ({
	color,
	className,
	...rest
}) => (
	<LinkOut
		className={cn(
			styles.link,
			color === "text-color" && styles.textColor,
			color === "inherit" && styles.inheritColor,
			className,
		)}
		{...rest}
	/>
);

interface MyClickLinkProps extends HTMLAttributes<HTMLSpanElement> {
	color?: "text-color" | "inherit";
}

export const MyClickLink: FCC<MyClickLinkProps> = ({ color, className, ...rest }) => (
	<span
		className={cn(
			styles.link,
			color === "text-color" && styles.textColor,
			color === "inherit" && styles.inheritColor,
			styles.clickLink,
			className,
		)}
		{...rest}
	/>
);
