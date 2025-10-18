import type { FCC } from "@/types/react";
import { cn } from "@/functions/cn";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import styles from "./MyLink.module.css";
import type { Route } from "next";

interface MyLinkProps
	extends LinkProps<Route>,
		Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	color?: "text-color" | "inherit";
}

export const MyLink: FCC<MyLinkProps> = ({ color, className, ...rest }) => (
	<Link
		className={cn(
			styles.link,
			color === "text-color" && styles.textColor,
			color === "inherit" && styles.inheritColor,
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
	<a
		className={cn(
			styles.link,
			color === "text-color" && styles.textColor,
			color === "inherit" && styles.inheritColor,
			className,
		)}
		rel="noopener noreferrer nofollow ugc"
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
