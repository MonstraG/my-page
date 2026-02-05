import { type FC, useRef, useState } from "react";
import { Textarea } from "@/ui/Textarea/Textarea.tsx";
import { Stack } from "@/ui/Stack/Stack.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { SendFilledIcon } from "@/icons/material/SendFilledIcon.tsx";
import { useSystemPrompt } from "@/components/chat/useSystemPrompt.tsx";
import { useOpenSnackbar } from "@/components/snack/Snackbars.tsx";
import type { ChatMessage } from "./Chat.types";
import { ChatMessageBlock } from "@/components/chat/ChatMessageBlock.tsx";

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

const textDecoder = new TextDecoder();

const minInputHeight = 38;
const messageInput = "message";

interface Props {
	url: URL;
	model: string | undefined;
}

export const ChatContent: FC<Props> = ({ url, model }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const latestMessagesRef = useRef<ChatMessage[]>([]);

	const [streamingMessage, setStreamingMessage] = useState<string>("");

	const addNewMessage = (role: "user" | "assistant", content: string) => {
		setMessages((prev) => {
			const newMessages = prev.concat({ role: role, content: content });
			console.log(newMessages);
			latestMessagesRef.current = newMessages;
			return newMessages;
		});
		setStreamingMessage("");
		scrollToBottom();
	};

	const appendToStreamingMessage = (content: string) => {
		setStreamingMessage((prev) => prev + content);
		scrollToBottom();
	};

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const [inputHeight, setInputHeight] = useState<number>(minInputHeight);

	const [systemPrompt] = useSystemPrompt();

	const completionsUrl = new URL(url);
	completionsUrl.pathname += `v1/chat/completions`;

	const openSnackbar = useOpenSnackbar();

	const sendMessage = async (formData: FormData) => {
		const text = formData.get(messageInput)?.toString() ?? "";
		if (!text) {
			return;
		}

		addNewMessage("user", text);

		const history = [{ role: "system", content: systemPrompt }].concat(
			latestMessagesRef.current,
		);

		fetch(completionsUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: model,
				messages: history,
				temperature: 0.7,
				max_tokens: -1,
				stream: true,
			}),
		})
			.then(handleResponse)
			.catch((error) => {
				console.error(error);
				if (error instanceof Error) {
					openSnackbar("error", error.message);
				} else {
					openSnackbar("error", error.toString());
				}
			});

		// and finally, reset height
		// but not inside finally, because we want to clear before we get to the answer
		setTimeout(() => {
			setInputHeight(minInputHeight);
		});
	};

	const scrollToBottom = () => {
		const scroller = scrollContainerRef.current;
		if (!scroller) {
			return;
		}
		scroller.scrollTo({ top: scroller.scrollHeight });
	};

	const readStreamingResponse = async (
		stream: ReadableStream<Uint8Array<ArrayBuffer>>,
		onMessageChunk: (messageSoFar: string) => void,
	) => {
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
	};

	const handleResponse = async (response: Response) => {
		if (response.body == null) {
			throw new Error("Missing body on response");
		}

		const fullMessage = await readStreamingResponse(response.body, appendToStreamingMessage);
		addNewMessage("assistant", fullMessage);
	};

	const parseLine = (line: string) => {
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
				openSnackbar("error", line);
				return { content: undefined, done: true };
			}
		}

		return { content: undefined, done: false };
	};

	const getHeight = (element: HTMLTextAreaElement) => {
		element.style.height = "auto";
		const height = Math.min(200, Math.max(minInputHeight, element.scrollHeight));
		element.style.height = `${height}px`;
		return height;
	};

	return (
		<>
			<div
				style={{
					flexBasis: 0,
					flexGrow: 1,
					overflow: "scroll",
					marginBlock: "1rem",
				}}
				ref={scrollContainerRef}
			>
				<Stack
					gap={0.5}
					style={{
						justifyContent: "flex-end",
						minHeight: "100%",
					}}
				>
					{messages.map((message, index) => (
						<ChatMessageBlock key={index} message={message} />
					))}
					{streamingMessage && (
						<ChatMessageBlock
							message={{ role: "assistant", content: streamingMessage }}
						/>
					)}
				</Stack>
			</div>

			<form action={sendMessage}>
				<Stack direction="row" gap={1} style={{ width: "100%", alignItems: "flex-end" }}>
					<Textarea
						name={messageInput}
						placeholder={model == null ? "Pick model first" : "Type here"}
						style={{ flexGrow: 1, height: `${inputHeight}px` }}
						rows={1}
						disabled={model == null}
						onChange={(event) => {
							setInputHeight(getHeight(event.target));
						}}
						onKeyDown={(event) => {
							if (!event.shiftKey && event.key === "Enter") {
								event.preventDefault();
								event.currentTarget.form?.requestSubmit();
							}
						}}
					/>
					<Button type="submit" square disabled={model == null}>
						<SendFilledIcon />
					</Button>
				</Stack>
			</form>
		</>
	);
};
