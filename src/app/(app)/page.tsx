import styles from "@/components/home/Home.module.css";
import { allPages } from "@/components/nav/pages";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { LinkCard } from "@/ui/LinkCard/LinkCard";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "Random tools I managed to make",
};

const HomePage: NextPage = () => (
	<ArticleContainer>
		<Stack gap={4}>
			<Stack gap={2} component="section">
				<h1>arsga.eu</h1>

				<Paragraph>
					Welcome to my collection of tools, built by me, in the limited time I can be
					excited about a new toy, with 95% home-grown organic AI-free code.
				</Paragraph>
			</Stack>
			<Stack gap={2} component="section">
				<h2>Tools</h2>

				<div className={styles.grid}>
					{allPages
						.filter((page) => !page.ignoreOnHome)
						.map((page) => (
							<LinkCard
								key={page.slug}
								href={page.href}
								Icon={page.Icon}
								header={page.name}
								description={page.description}
							/>
						))}
				</div>
			</Stack>
		</Stack>
	</ArticleContainer>
);

export default HomePage;
