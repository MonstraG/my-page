import type { FCC } from "@/types/react";
import styles from "./MyLink.module.css";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { clsx } from "clsx";

interface MyLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	color?: "text-color";
}

export const MyLink: FCC<MyLinkProps> = ({ color, className, ...rest }) => (
	<Link
		className={clsx(
			styles.link,
			color === "text-color" ? styles.unsetColor : undefined,
			className
		)}
		{...rest}
	/>
);
