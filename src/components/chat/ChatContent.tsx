import { type FC, useRef, useState } from "react";
import { Textarea } from "@/ui/Textarea/Textarea.tsx";
import { Stack } from "@/ui/Stack/Stack.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { SendFilledIcon } from "@/icons/material/SendFilledIcon.tsx";
import { useSystemPrompt } from "@/components/chat/useSystemPrompt.tsx";
import type { ChatMessage } from "./Chat.types";
import { ChatMessageBlock } from "@/components/chat/ChatMessageBlock.tsx";
import { snack } from "@/components/snack/snack.ts";
import { readStreamingResponse } from "./readStreamingResponse";

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
			.then(async (response) => {
				if (response.body == null) {
					throw new Error("Missing body on response");
				}

				const fullMessage = await readStreamingResponse(
					response.body,
					appendToStreamingMessage,
				);
				addNewMessage("assistant", fullMessage);
			})
			.catch((error) => {
				console.error(error);
				snack("error", "Request to LLM failed, see console for detail.");
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
