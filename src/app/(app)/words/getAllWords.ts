import { promises as fsPromises } from "fs";

export async function getAllWords() {
	return fsPromises.readFile(`public/20k.txt`, "utf8");
}
