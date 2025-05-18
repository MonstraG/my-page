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
	const { data } = await getPost(params.slug);
	if (typeof data?.title === "string") {
		return {
			title: data.title,
		};
	}

	return {
		title: "Blog",
	};
};

const ArticlePage: NextPage<Props> = async (props) => {
	const params = await props.params;
	const { data, content } = await getPost(params.slug);

	if (data == null) {
		return notFound();
	}

	return (
		<ArticleContainer>
			<Stack component="section" gap={data.image ? 4 : 1}>
				<h1>{data.title}</h1>
				{data.image && (
					<Stack style={{ alignItems: "center" }}>
						<Image
							src={data.image.src}
							alt={data.image.alt}
							width={data.image.width}
							height={data.image.height}
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
