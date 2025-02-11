import type { FCC } from "@/types/react";
import styles from "./MyLink.module.css";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

interface MyLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

export const MyLink: FCC<MyLinkProps> = (props) => {
	return <Link className={styles.link} {...props} />;
};
