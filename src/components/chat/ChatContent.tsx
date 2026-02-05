import { type Dispatch, type FC, type SetStateAction, useRef, useState } from "react";
import { Textarea } from "@/ui/Textarea/Textarea.tsx";
import { Stack } from "@/ui/Stack/Stack.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { SendFilledIcon } from "@/icons/material/SendFilledIcon.tsx";
import { useSystemPrompt } from "@/components/chat/useSystemPrompt.tsx";
import type { ChatMessage } from "./Chat.types";
import { ChatMessageBlock } from "@/components/chat/ChatMessageBlock.tsx";
import { snack } from "@/components/snack/snack.ts";
import { readStreamingResponse } from "./readStreamingResponse";
import { StopFilledIcon } from "@/icons/material/StopFilledIcon.tsx";
import { isAborted } from "@/functions/isAborted.tsx";
import { Popover } from "@/ui/Popover/Popover.tsx";
import { usePopoverControl } from "@/ui/Popover/usePopoverControl.ts";
import { DeleteFilledIcon } from "@/icons/material/DeleteFilledIcon";

interface Props {
	url: URL;
	model: string | undefined;
}

export const ChatContent: FC<Props> = ({ url, model }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [streamingMessage, setStreamingMessage] = useState<string>("");

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const scrollToBottom = () => {
		const scroller = scrollContainerRef.current;
		if (!scroller) {
			return;
		}
		scroller.scrollTo({ top: scroller.scrollHeight });
	};

	const popoverControl = usePopoverControl<number>();

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
						<ChatMessageBlock
							key={index}
							message={message}
							onContextMenu={(event) => popoverControl.handleOpen(event, index)}
						/>
					))}
					{streamingMessage && (
						<ChatMessageBlock
							message={{ role: "assistant", content: streamingMessage }}
						/>
					)}
				</Stack>
			</div>

			<Popover
				isOpen={popoverControl.isOpen}
				close={popoverControl.handleClose}
				anchor={popoverControl.anchor}
			>
				<Button
					startDecorator={<DeleteFilledIcon />}
					onClick={() => {
						const index = popoverControl.context;
						if (index == null) {
							return;
						}
						setMessages((prev) => prev.toSpliced(index, 1));
						popoverControl.handleClose();
					}}
				>
					Delete
				</Button>
			</Popover>

			<Form
				url={url}
				model={model}
				setMessages={setMessages}
				setStreamingMessage={setStreamingMessage}
				scrollToBottom={scrollToBottom}
			/>
		</>
	);
};

/**
 * Honestly, a huge hack for auto-resizing input, I need a better solution here
 */
const minInputHeight = 40;
const messageInput = "message";

const Form: FC<{
	url: URL;
	model: string | undefined;
	setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
	setStreamingMessage: Dispatch<SetStateAction<string>>;
	scrollToBottom: () => void;
}> = ({ url, model, setMessages, setStreamingMessage, scrollToBottom }) => {
	const [inputHeight, setInputHeight] = useState<number>(minInputHeight);
	const latestMessagesRef = useRef<ChatMessage[]>([]);
	const streamingMessageRef = useRef<string>("");

	const [pendingAbortController, setPendingAbortController] = useState<AbortController | null>(
		null,
	);

	const [systemPrompt] = useSystemPrompt();

	const completionsUrl = new URL(url); // clone
	completionsUrl.pathname += `v1/chat/completions`;

	const addNewMessage = (role: "user" | "assistant", content: string) => {
		setMessages((prev) => {
			const newMessages = prev.concat({ role: role, content: content });
			latestMessagesRef.current = newMessages;
			streamingMessageRef.current = "";
			return newMessages;
		});
		scrollToBottom();
	};

	const saveStreamingMessage = () => {
		setPendingAbortController(null);
		addNewMessage("assistant", streamingMessageRef.current);
		setStreamingMessage("");
	};

	const sendMessage = async (formData: FormData) => {
		const text = formData.get(messageInput)?.toString() ?? "";
		if (!text) {
			return;
		}

		const abortController = new AbortController();
		setPendingAbortController(abortController);
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
			signal: abortController.signal,
		})
			.then(async (response) => {
				if (response.body == null) {
					throw new Error("Missing body on response");
				}

				await readStreamingResponse(response.body, (chunk) => {
					setStreamingMessage((prev) => prev + chunk);
					streamingMessageRef.current += chunk;
					scrollToBottom();
				});
				saveStreamingMessage();
			})
			.catch((error) => {
				if (isAborted(error)) {
					return;
				}

				console.error(error);
				snack("error", "Request to LLM failed, see console for detail.");
			});

		// and finally, reset height
		// but not inside finally, because we want to clear before we get to the answer
		setTimeout(() => {
			setInputHeight(minInputHeight);
		});
	};

	const modelSelected = model != null;

	return (
		<form
			action={
				pendingAbortController
					? () => {
							pendingAbortController.abort();
							saveStreamingMessage();
						}
					: sendMessage
			}
		>
			<Stack direction="row" gap={1} style={{ width: "100%", alignItems: "flex-end" }}>
				<ChatInput
					modelSelected={modelSelected}
					inputHeight={inputHeight}
					setInputHeight={setInputHeight}
				/>
				<Button type="submit" square disabled={!modelSelected}>
					{pendingAbortController ? <StopFilledIcon /> : <SendFilledIcon />}
				</Button>
			</Stack>
		</form>
	);
};

const ChatInput: FC<{
	modelSelected: boolean;
	inputHeight: number;
	setInputHeight: Dispatch<SetStateAction<number>>;
}> = ({ modelSelected, inputHeight, setInputHeight }) => {
	const getHeight = (element: HTMLTextAreaElement) => {
		element.style.height = "auto";
		const height = Math.min(200, Math.max(minInputHeight, element.scrollHeight));
		element.style.height = `${height}px`;
		return height;
	};

	return (
		<Textarea
			name={messageInput}
			placeholder={modelSelected ? "Type here" : "Pick model first"}
			style={{ flexGrow: 1, height: `${inputHeight}px` }}
			rows={1}
			disabled={!modelSelected}
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
	);
};
