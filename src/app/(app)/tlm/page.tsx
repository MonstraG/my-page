import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import type { NextPage } from "next";
import { promises as fsPromises } from "node:fs";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function newArray(length: number) {
	return Array.from({ length });
}

function randInt(exclusiveMax: number) {
	return Math.floor(Math.random() * exclusiveMax);
}

// https://youtu.be/kCc8FmEb1nY?si=v0_SYeg1EPqx8BdJ&t=1394

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
	const batchSize = 4;

	function getBatch(split: "train" | "verify") {
		const data = split === "train" ? trainData : verifyData;
		const offsets = newArray(batchSize).map(() => randInt(data.length - blockSize));
		const x = offsets.map(offset => data.slice(offset, offset + blockSize));
		const y = offsets.map(offset => data.slice(offset + 1, offset + blockSize + 1));
		return [x, y];
	}

	const [xb, yb] = getBatch("train");

	const bigramLanguageModel = (() => {
		// https://pytorch.org/docs/stable/generated/torch.nn.Embedding.html
		// https://github.com/pytorch/pytorch/blob/ad5e9065acc86a90d72b82a5ce0cb5f643c2992b/torch/ao/nn/quantized/modules/embedding_ops.py
		// https://github.dev/pytorch/pytorch/blob/ad5e9065acc86a90d72b82a5ce0cb5f643c2992b/torch/nn/modules/module.py

		// alphabetSize x alphabetSize table, pre-initialized with zeroes
		const embeddingTable = newArray(alphabetSize).map(() =>
			newArray(alphabetSize).map(() => 0)
		);

		return function doShit(xb: Uint8Array<ArrayBuffer>[], yb: Uint8Array<ArrayBuffer>[]) {
			// ????
		};
	})();

	const stuff = bigramLanguageModel(xb, yb);

	return (
		<ArticleContainer>
			<p>
				{alphabet.map(l => <span key={l}>{l}</span>)}
			</p>
			<p>
				{alphabetSize}
			</p>
			{
				/*
			<pre>
				{JSON.stringify(xb, null, 4)}
			</pre>
			<pre>
				{JSON.stringify(yb, null, 4)}
			</pre>
				*/
			}
		</ArticleContainer>
	);
};

export default TinyLanguageModelPage;
