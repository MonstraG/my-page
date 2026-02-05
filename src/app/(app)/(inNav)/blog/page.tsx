import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage, Route } from "next";
import { allPosts } from "@/components/blog/allPosts";

export const metadata: Metadata = {
	title: "blog thing.",
	description: "Markdown-based articles.",
};

const BlogPage: NextPage = () => (
	<ArticleContainer style={{ maxWidth: "60em" }}>
		<Stack direction="column" gap={3}>
			<h1>blog thing.</h1>

			{allPosts.map((post) => (
				<Sheet key={post.slug}>
					<Stack direction="column" gap={0.5}>
						<time dateTime={post.date}>{post.date}</time>
						<MyLink href={`/blog/${post.slug}` as Route} color="text-color">
							<h2>{post.title}</h2>
						</MyLink>
						{post.categories && (
							<Paragraph size="sm">
								{post.categories.map((category) => (
									<span key={category}>{category}</span>
								))}
							</Paragraph>
						)}
					</Stack>
				</Sheet>
			))}
		</Stack>
	</ArticleContainer>
);

export default BlogPage;
