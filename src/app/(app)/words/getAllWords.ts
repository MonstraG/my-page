import fs from "fs";
import readline from "readline";

export async function getAllWords(): Promise<string[]> {
	const fileStream = fs.createReadStream("public/50k.txt", "utf8");

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const lines = [];
	for await (const line of rl) {
		// When 20000 lines are read, stop reading further by breaking the loop
		if (lines.length === 20000) {
			break;
		}

		// and this is where I cry about lack of Array.from(AsyncIterator).
		lines.push(line);
	}

	return lines;
}
