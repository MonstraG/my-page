import { remark } from "remark";
import html from "remark-html";
import path from "path";
import { promises as fsPromises } from "fs";

const postsDirectory = "posts";

const processor = remark().use(html);

// // Use gray-matter to parse the post metadata section
// const matterResult = matter(fileContents);

export async function getPost(slug: string) {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	return fsPromises
		.readFile(fullPath, "utf8")
		.then((fileContents) => processor.process(fileContents))
		.then((file) => file.toString());
}
