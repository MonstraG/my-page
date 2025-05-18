import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Test page",
	description: "This page exists only to test various ui elements in local development",
};

const TestPage: NextPage = () => (
	<ArticleContainer>
		<Stack component="section" gap={1}>
			<h1>Test page</h1>
			<Paragraph>
				This page exists only to test various ui elements in local development.{" "}
				<MyLink href="/">Back to home.</MyLink>
			</Paragraph>
		</Stack>
	</ArticleContainer>
);

export default TestPage;
