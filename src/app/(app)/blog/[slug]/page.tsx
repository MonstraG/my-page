import { BlogBody } from "@/components/blog/BlogBody/BlogBody";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allPosts } from "@/components/blog/allPosts";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";
import { allPages, getMetadata } from "@/components/nav/pages";

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

	return getMetadata(allPages.blog);
};

const ArticlePage: NextPage<Props> = async (props) => {
	const params = await props.params;
	const post = allPosts.find((p) => p.slug === params.slug);
	if (post == null) {
		return notFound();
	}

	return (
		<MainLayout path={[{ name: "Blog", href: "/blog" }, { name: post.title }]} width="narrow">
			<Stack component="article" gap={post.image ? 4 : 1}>
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
		</MainLayout>
	);
};

export default ArticlePage;
