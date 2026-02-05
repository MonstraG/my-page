import { snack } from "@/components/snack/snack.ts";

export async function readStreamingResponse(
	stream: ReadableStream<Uint8Array<ArrayBuffer>>,
	onMessageChunk: (messageSoFar: string) => void,
) {
	let messageSoFar = "";

	const reader = stream.getReader();
	while (true) {
		const readableResult = await reader.read();
		if (readableResult.done) {
			return messageSoFar;
		}
		if (!readableResult.value) {
			continue;
		}

		const chunk = textDecoder.decode(readableResult.value, { stream: true });
		const lines = chunk.split("\n");
		for (const line of lines) {
			const trimmed = line.trim();
			if (trimmed === "") {
				continue;
			}

			const parseResult = parseLine(line);
			if (parseResult.content) {
				messageSoFar += parseResult.content;
				onMessageChunk(messageSoFar);
			}
			if (parseResult.done) {
				return messageSoFar;
			}
		}
	}
}

const textDecoder = new TextDecoder();

function parseLine(line: string) {
	if (line.startsWith("data:")) {
		const dataStr = line.slice(5).trim();
		if (dataStr === "[DONE]") {
			return { content: undefined, done: true };
		}

		const content = extractDeltaFromLine(dataStr);
		return { content, done: false };
	} else if (line.startsWith("event:")) {
		const eventType = line.slice(6).trim();
		if (eventType === "error") {
			console.error("Received error event from server:", line);
			snack("error", "LLM returned error message, see console for details");
			return { content: undefined, done: true };
		}
	}

	return { content: undefined, done: false };
}

function extractDeltaFromLine(dataString: string): string | undefined {
	const json: unknown = JSON.parse(dataString);
	if (typeof json !== "object" || json == null || !("choices" in json)) {
		return undefined;
	}

	const choices = json.choices;
	if (!Array.isArray(choices) || choices.length === 0) {
		return undefined;
	}

	const choice: unknown = choices[0];
	if (typeof choice !== "object" || choice == null || !("delta" in choice)) {
		return undefined;
	}

	const delta = choice.delta;
	if (typeof delta !== "object" || delta == null || !("content" in delta)) {
		return undefined;
	}

	const content = delta.content;
	if (typeof content !== "string") {
		return undefined;
	}

	return content;
}
