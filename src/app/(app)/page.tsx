import styles from "@/components/home/Home.module.css";
import { allPages, getMetadata } from "@/components/nav/pages";
import { LinkCard } from "@/ui/LinkCard/LinkCard";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout.tsx";

export const metadata: Metadata = getMetadata(allPages.home);

const HomePage: NextPage = () => (
	<MainLayout path={undefined}>
		<Stack gap={4} component="article">
			<Paragraph>
				Welcome to my collection of tools, built by me, in the limited time I can be excited
				about a new toy, with 95% home-grown organic AI-free code.
			</Paragraph>
			<Stack gap={2} component="section">
				<h2>Tools</h2>

				<div className={styles.grid}>
					{Object.values(allPages)
						.filter((page) => !page.ignoreOnHome)
						.map((page) => (
							<LinkCard
								key={page.href}
								href={page.href}
								Icon={page.Icon}
								header={page.title}
								description={page.description}
							/>
						))}
				</div>
			</Stack>
		</Stack>
	</MainLayout>
);

export default HomePage;
