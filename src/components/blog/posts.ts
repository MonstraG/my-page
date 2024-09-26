import { remark } from "remark";
import html from "remark-html";
import path from "path";
import { promises as fsPromises } from "fs";
import {
	type ParsedMarkdownPost,
	parseMarkdownData,
	type PostMetadata
} from "@/components/blog/parseMarkdownData";

const postsDirectory = "posts";

const processor = remark().use(html);

export async function getPost(slug: string): Promise<ParsedMarkdownPost> {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	return fsPromises
		.readFile(fullPath, "utf8")
		.then(async (fileContents) => {
			const parsedMarkdown = parseMarkdownData(fileContents);

			const content = (await processor.process(parsedMarkdown.content)).toString();

			return {
				data: parsedMarkdown.data,
				content: content
			};
		})
		.catch(() => {
			return {
				data: undefined,
				content: ""
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
