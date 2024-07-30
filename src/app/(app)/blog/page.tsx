import type { Metadata, NextPage } from "next";
import Container from "@mui/joy/Container";
import { getAllPosts } from "@/app/(app)/blog/posts";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";

const allPosts = await getAllPosts();

export const metadata: Metadata = {
	title: "Blog"
};

const BlogPage: NextPage = () => (
	<Container sx={{ py: 10 }} maxWidth="md">
		<Stack gap={8}>
			<Typography level="h1">blog thing.</Typography>

			{allPosts.map((post) => (
				<Card key={post.slug}>
					<Typography>{post.date}</Typography>
					<Link href={`/blog/${post.slug}`}>
						<Typography level="h2">{post.title}</Typography>
					</Link>
				</Card>
			))}
		</Stack>
	</Container>
);

export default BlogPage;
