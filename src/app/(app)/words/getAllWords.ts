import { promises as fsPromises } from "fs";

export async function getAllWords() {
	return fsPromises.readFile(`public/50k.txt`, "utf8");
}
