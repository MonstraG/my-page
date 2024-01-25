import { promises as fs } from "fs";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { language: string } }) {
	const language = params.language;

	// todo: validation
	const words = await fs
		.readFile(`public/words/${language}.txt`, "utf8")
		.then((file) => file.split("\n"));

	return new Response(JSON.stringify(words), {
		status: 200
	});
}
