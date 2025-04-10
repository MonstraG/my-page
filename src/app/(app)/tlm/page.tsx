import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import type { NextPage } from "next";
import { promises as fsPromises } from "node:fs";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// https://youtu.be/kCc8FmEb1nY?si=HbQAguqA5Tuo4rV2&t=1122

const TinyLanguageModelPage: NextPage = async () => {
	const tinyShakespeare = await fsPromises.readFile("public/tiny_shakespeare.txt", "utf-8");
	const characters = new Set<string>();
	for (const letter of tinyShakespeare) {
		characters.add(letter);
	}
	const alphabet = [...characters].sort();
	const alphabetSize = alphabet.length;

	const tensorShakespeare = textEncoder.encode(tinyShakespeare);

	const trainSplitRatio = 0.9;
	const trainSplitIndex = Math.floor(tensorShakespeare.length * trainSplitRatio);
	const trainData = tensorShakespeare.slice(0, trainSplitIndex);
	const verifyData = tensorShakespeare.slice(trainSplitIndex);

	const blockSize = 8;

	const x = trainData.slice(0, blockSize);
	const y = trainData.slice(1, blockSize + 1);
	for (let t = 0; t < blockSize; t++) {
		const context = x.slice(0, t + 1);
		const target = y[t];
		console.log(`when input is ${context}, target is ${target}`);
	}

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
