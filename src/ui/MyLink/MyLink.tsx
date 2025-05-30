import type { FCC } from "@/types/react";
import { clsx } from "clsx";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import styles from "./MyLink.module.css";

interface MyLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	color?: "text-color" | "inherit";
}

export const MyLink: FCC<MyLinkProps> = ({ color, className, ...rest }) => (
	<Link
		className={clsx(
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
		className={clsx(
			styles.link,
			color === "text-color" && styles.textColor,
			color === "inherit" && styles.inheritColor,
			styles.clickLink,
			className,
		)}
		{...rest}
	/>
);
