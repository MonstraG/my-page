import type { Metadata, NextPage } from "next";
import { getAllPosts } from "@/components/blog/posts";
import { Container } from "@/ui/Container/Container";
import { Stack } from "@/ui/Stack/Stack";
import { Sheet } from "@/ui/Sheet/Sheet";
import { MyLink } from "@/ui/MyLink/MyLink";

const allPosts = await getAllPosts();

export const metadata: Metadata = {
	title: "blog thing."
};

const BlogPage: NextPage = () => (
	<Container style={{ maxWidth: "900px" }}>
		<Stack direction="column" gap={3}>
			<h1>blog thing.</h1>

			{allPosts
				.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
				.map((post) => (
					<Sheet key={post.slug}>
						<Stack direction="column" gap={1}>
							<time dateTime={post.date}>{post.date}</time>
							<MyLink href={`/blog/${post.slug}`} color="text-color">
								<h2>{post.title}</h2>
							</MyLink>
						</Stack>
					</Sheet>
				))}
		</Stack>
	</Container>
);

export default BlogPage;
