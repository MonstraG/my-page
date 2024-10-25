import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "node:path";

// https://github.com/orgs/vercel/discussions/1305#discussioncomment-7827702
function getPublicFilePath(originalPath: string): string {
	originalPath = originalPath.replace("./public/", "");
	return path.resolve("./public", originalPath);
}

export async function GET(_: NextRequest, props: { params: Promise<{ language: string }> }) {
	const params = await props.params;
	const language = params.language;

	// todo: validation
	const words = await fs
		.readFile(getPublicFilePath(`./public/words/${language}.txt`), "utf8")
		.then((file) => file.split("\n"));

	return new Response(JSON.stringify(words), {
		status: 200
	});
}
