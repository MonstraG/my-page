import { remark } from "remark";
import html from "remark-html";
import path from "path";
import { promises as fsPromises } from "fs";
import { type ParsedMarkdown, parseMarkdownData } from "@/app/(app)/blog/parseMarkdownData";

const postsDirectory = "posts";

const processor = remark().use(html);

export async function getPost(slug: string): Promise<ParsedMarkdown> {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	return fsPromises.readFile(fullPath, "utf8").then(async (fileContents) => {
		const parsedMarkdown = parseMarkdownData(fileContents);
		return {
			data: parsedMarkdown.data,
			content: (await processor.process(parsedMarkdown.content)).toString()
		};
	});
}
