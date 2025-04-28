import {
	type ParsedMarkdownPost,
	parseMarkdownData,
	type PostMetadata,
} from "@/components/blog/parseMarkdownData";
import { promises as fsPromises } from "fs";
import path from "path";
const postsDirectory = "posts";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createHighlighter } from "shiki";
import { unified } from "unified";

const highlighter = await createHighlighter({
	themes: ["github-dark-default"],
	langs: ["csharp"],
});

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeShikiFromHighlighter, highlighter, {
		theme: "github-dark-default",
		langs: ["csharp"],
	})
	.use(rehypeStringify);

export async function getPost(slug: string): Promise<ParsedMarkdownPost> {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	return fsPromises
		.readFile(fullPath, "utf8")
		.then(async (fileContents) => {
			const parsedMarkdown = parseMarkdownData(fileContents);

			const content = (await processor.process(parsedMarkdown.content)).toString();

			return {
				data: parsedMarkdown.data,
				content: content,
			};
		})
		.catch(() => {
			return {
				data: undefined,
				content: "",
			};
		});
}

export async function getAllPosts(): Promise<PostMetadata[]> {
	const files = await fsPromises.readdir(postsDirectory, "utf8");

	const articles = files.map(async (file) => {
		const filePath = path.join(postsDirectory, file);
		const fileContents = await fsPromises.readFile(filePath, "utf8");
		return parseMarkdownData(fileContents).data;
	});

	return Promise.all(articles).then((metadatas) =>
		metadatas.filter((metadata): metadata is PostMetadata => metadata != null)
	);
}

// import rehypeStringify from 'rehype-stringify'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import { createHighlighterCore } from 'shiki/core'
// import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
//
// import { unified } from 'unified'
//
// const highlighter = await createHighlighterCore({
// 	themes: [
// 		import('@shikijs/themes/vitesse-light')
// 	],
// 	langs: [
// 		import('@shikijs/langs/javascript'),
// 	],
// 	engine: createOnigurumaEngine(() => import('shiki/wasm'))
// })
//
// const raw = await fs.readFile('./input.md')
// const file = await unified()
// 	.use(remarkParse)
// 	.use(remarkRehype)
// 	.use(rehypeShikiFromHighlighter, highlighter, {
// 		// or `theme` for a single theme
// 		themes: {
// 			light: 'vitesse-light',
// 			dark: 'vitesse-dark',
// 		}
// 	})
// 	.use(rehypeStringify)
// 	.processSync(raw) // it's also possible to process synchronously
