import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { promises as fsPromises } from "fs";
import type { NextPage } from "next";

// https://youtu.be/kCc8FmEb1nY?si=3BUykQtlayjkT_Jo&t=673

const TinyLanguageModelPage: NextPage = async () => {
	const tinyShakespeare = await fsPromises.readFile("public/tiny_shakespeare.txt", "utf-8");
	const characters = new Set<string>();
	for (const letter of tinyShakespeare) {
		characters.add(letter);
	}
	const alphabet = [...characters].sort();
	const alphabetSize = alphabet.length;

	return (
		<ArticleContainer>
			<p>
				{alphabet.map(l => <span key={l}>{l}</span>)}
			</p>
			<p>
				{alphabetSize}
			</p>
		</ArticleContainer>
	);
};

export default TinyLanguageModelPage;
