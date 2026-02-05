import { BlogBody } from "@/components/blog/BlogBody/BlogBody";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allPosts } from "@/components/blog/allPosts";

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams(): { slug: string }[] {
	return allPosts.map((post) => ({ slug: post.slug }));
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
	const params = await props.params;
	const post = allPosts.find((p) => p.slug === params.slug);
	if (typeof post?.title === "string") {
		return {
			title: post.title,
		};
	}

	return {
		title: "Blog",
	};
};

const ArticlePage: NextPage<Props> = async (props) => {
	const params = await props.params;
	const post = allPosts.find((p) => p.slug === params.slug);
	if (post == null) {
		return notFound();
	}

	return (
		<ArticleContainer style={{ maxWidth: "60em" }}>
			<Stack component="section" gap={post.image ? 4 : 1}>
				<h1>{post.title}</h1>
				{post.image && (
					<Stack style={{ alignItems: "center" }}>
						<Image
							src={post.image.src}
							alt={post.image.alt}
							width={post.image.width}
							height={post.image.height}
							priority
						/>
					</Stack>
				)}
				<BlogBody>{post.body}</BlogBody>
			</Stack>
		</ArticleContainer>
	);
};

export default ArticlePage;
