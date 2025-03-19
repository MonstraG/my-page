import { NavLinks } from "@/components/nav/NavLinks";
import type { FCC } from "@/types/react";
import { Divider } from "@/ui/Divider/Divider";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import styles from "./NavLayout.module.css";

export const NavLayout: FCC = ({ children }) => (
	<div className={styles.wrapper}>
		<aside className={styles.aside}>
			<NavLinks />

			<Divider />

			<ListEndDecor />

			<Paragraph size="sm" color="superGray" centered>
				{process.env.NODE_ENV} {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6)}
			</Paragraph>
		</aside>

		<main className={styles.main}>{children}</main>
	</div>
);
