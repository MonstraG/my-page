import { BlogBody } from "@/components/blog/BlogBody/BlogBody";
import { getAllPosts, getPost } from "@/components/blog/posts";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const allPosts = await getAllPosts();
	return allPosts.map((post) => ({ slug: post.slug }));
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
	const params = await props.params;
	const { metadata } = await getPost(params.slug);
	if (typeof metadata?.title === "string") {
		return {
			title: metadata.title,
		};
	}

	return {
		title: "Blog",
	};
};

const ArticlePage: NextPage<Props> = async (props) => {
	const params = await props.params;
	const { metadata, content } = await getPost(params.slug);

	if (metadata == null) {
		return notFound();
	}

	return (
		<ArticleContainer style={{ maxWidth: "60em" }}>
			<Stack component="section" gap={metadata.image ? 4 : 1}>
				<h1>{metadata.title}</h1>
				{metadata.image && (
					<Stack style={{ alignItems: "center" }}>
						<Image
							src={metadata.image.src}
							alt={metadata.image.alt}
							width={metadata.image.width}
							height={metadata.image.height}
							priority
						/>
					</Stack>
				)}
				<BlogBody dangerouslySetInnerHTML={{ __html: content }} />
			</Stack>
		</ArticleContainer>
	);
};

export default ArticlePage;
