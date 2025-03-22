import { NavLinks } from "@/components/nav/NavLinks";
import type { FCC } from "@/types/react";
import { Divider } from "@/ui/Divider/Divider";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import styles from "./NavLayout.module.css";

export const NavLayout: FCC = ({ children }) => (
	<div className={styles.wrapper}>
		<header>
			<NavLinks />
			<Divider />
		</header>
		<main className={styles.main}>
			{children}
		</main>
		<footer>
			<Divider />
			<Paragraph size="sm" color="superGray" centered style={{ paddingBlock: "0.5rem" }}>
				{process.env.NODE_ENV} {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6)}
			</Paragraph>
		</footer>
	</div>
);
