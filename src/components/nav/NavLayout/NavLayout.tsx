import { TopBarLinks } from "@/components/nav/TopBarLinks/TopBarLinks";
import type { FCC } from "@/types/react";
import { Divider } from "@/ui/Divider/Divider";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import styles from "./NavLayout.module.css";

export const NavLayout: FCC = ({ children }) => (
	<div className={styles.wrapper}>
		<header>
			<nav className={styles.nav}>
				<TopBarLinks />
			</nav>
			<Divider />
		</header>
		<main className={styles.main}>
			{children}
		</main>
		<footer>
			<Divider />
			<Stack
				direction="row"
				gap={1}
				className={styles.footerContent}
			>
				<Stack>
					<Paragraph size="sm" color="superGray">
						Developed on{" "}
						<MyLink color="inherit" href="https://github.com/MonstraG/my-page">
							Github
						</MyLink>, hosted on{" "}
						<MyLink color="inherit" href="https://vercel.com/">
							Vercel
						</MyLink>, powered by{" "}
						<MyLink color="inherit" href="https://next.js">
							Next.js
						</MyLink>
					</Paragraph>
					<Paragraph size="sm" color="superGray">
						by Arseny Garelyshev, © 2025
					</Paragraph>
				</Stack>

				<Paragraph size="sm" color="superGray">
					{process.env.NODE_ENV}{" "}
					{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6)}
				</Paragraph>
			</Stack>
		</footer>
	</div>
);
