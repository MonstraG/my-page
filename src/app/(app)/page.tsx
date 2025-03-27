import styles from "@/components/home/Home.module.css";
import { D20Icon } from "@/icons/custom/D20Icon";
import { GithubIcon } from "@/icons/custom/GithubIcon";
import { CasinoIcon } from "@/icons/material/CasinoIcon";
import { DictionaryIcon } from "@/icons/material/DictionaryIcon";
import { NewsIcon } from "@/icons/material/NewsIcon";
import { VideocamIcon } from "@/icons/material/VideocamIcon";
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
					<LinkCard
						href="/about"
						Icon={GithubIcon}
						header="About"
						description="See if my github API thingie still runs"
					/>
					<LinkCard
						href="/dice"
						Icon={CasinoIcon}
						header="Dice rolling"
						description="Have you wondered how does the 4d6 distribution look like?"
					/>
					<LinkCard
						href="/words/en"
						Icon={DictionaryIcon}
						header="Vocabulary tester"
						description="Check your vocabulary, and find the most common word you don't yet know"
					/>
					<LinkCard
						href="/dnd-spells"
						Icon={D20Icon}
						header="DnD spells"
						description="Browse and search across all standard 5.5e DnD spells without page loads"
					/>
					<LinkCard
						href="/blog"
						Icon={NewsIcon}
						header="Blog"
						description="Read like 3 short articles because everyone has a markdown blog"
					/>
					<LinkCard
						href="/video"
						disabled
						Icon={VideocamIcon}
						header="Video"
						description="COMING SOON: p2p video sessions, if google meets continues to suck"
					/>
				</div>
			</Stack>
		</Stack>
	</ArticleContainer>
);

export default HomePage;
