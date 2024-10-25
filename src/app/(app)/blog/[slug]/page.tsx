import { getAllPosts, getPost } from "@/components/blog/posts";
import type { Metadata } from "next";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams() {
	const allPosts = await getAllPosts();
	return allPosts.map((post) => ({ slug: post.slug }));
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
	const params = await props.params;
	const { data } = await getPost(params.slug);
	if (typeof data?.title === "string") {
		return {
			title: data.title
		};
	}

	return {
		title: "Blog"
	};
};

const ArticlePage = async (props: Props) => {
	const params = await props.params;
	const { data, content } = await getPost(params.slug);

	if (data == null) {
		return notFound();
	}

	return (
		<Container sx={{ py: 10 }}>
			<article>
				<Typography level="h1" gutterBottom>
					{data.title}
				</Typography>
				{data.image && (
					<Stack sx={{ my: 8 }} alignItems="center">
						<Image
							src={data.image.src}
							alt={data.image.alt}
							width={data.image.width}
							height={data.image.height}
							priority
						/>
					</Stack>
				)}
				<Typography
					component="div"
					sx={{
						pre: {
							background: "rgba(255,255,255,0.05)",
							p: 2
						}
					}}
				>
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</Typography>
			</article>
		</Container>
	);
};

export default ArticlePage;
