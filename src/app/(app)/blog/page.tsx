import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage, Route } from "next";
import { allPosts } from "@/components/blog/allPosts";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout.tsx";
import { allPages, getMetadata } from "@/components/nav/pages";

export const metadata: Metadata = getMetadata(allPages.blog);

const BlogPage: NextPage = () => (
	<MainLayout path="Blog" width="narrow">
		<Stack component="article" direction="column" gap={3}>
			{allPosts.map((post) => (
				<Sheet key={post.slug}>
					<Stack direction="column" component="article" gap={0.5}>
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
	</MainLayout>
);

export default BlogPage;
