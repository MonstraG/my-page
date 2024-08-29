import path from "path";
import { promises as fsPromises } from "fs";

const booksDirectory = "books";

export async function getBook(slug: string): Promise<string> {
	const fullPath = path.join(booksDirectory, `${slug}.html`);
	return fsPromises.readFile(fullPath, "utf8").then((file) => file.toString());
}
