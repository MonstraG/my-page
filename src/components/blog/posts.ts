import {
	type ParsedMarkdownPost,
	parseMarkdownData,
	type PostMetadata,
} from "@/components/blog/parseMarkdownData";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { promises as fsPromises } from "fs";
import path from "path";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createHighlighter } from "shiki";
import { unified } from "unified";

const postsDirectory = "posts";

const highlighterTheme = "github-dark-default";
const highlighterLangs = "csharp";

const highlighter = await createHighlighter({
	themes: [highlighterTheme],
	langs: [highlighterLangs],
});

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeShikiFromHighlighter, highlighter, {
		theme: highlighterTheme,
		langs: [highlighterLangs],
	})
	.use(rehypeStringify);

export async function getPost(slug: string): Promise<ParsedMarkdownPost> {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	return fsPromises
		.readFile(fullPath, "utf8")
		.then(async (fileContents) => {
			const parsedMarkdownPost = parseMarkdownData(fileContents);

			return {
				metadata: parsedMarkdownPost.metadata,
				content: (await processor.process(parsedMarkdownPost.content)).toString(),
			};
		})
		.catch((error: unknown) => {
			console.error("Failed to parse file", fullPath, error);
			return {
				metadata: undefined,
				content: "",
			};
		});
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	const files = await fsPromises.readdir(postsDirectory, "utf8");

	const articles = files.map(async (file) => {
		const filePath = path.join(postsDirectory, file);
		const fileContents = await fsPromises.readFile(filePath, "utf8");
		return parseMarkdownData(fileContents).metadata;
	});

	return Promise.all(articles).then((metadatas) =>
		metadatas.filter((metadata) => metadata != null)
	);
}
