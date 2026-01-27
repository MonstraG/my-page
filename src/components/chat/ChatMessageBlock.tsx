import type { FC } from "react";
import type { ChatMessage } from "@/components/chat/Chat.types.ts";
import styles from "./ChatMessageBlock.module.css";
import { cn } from "@/functions/cn.ts";

interface Props {
	message: ChatMessage;
}

export const ChatMessageBlock: FC<Props> = ({ message }) => (
	<div
		className={cn(
			styles.block,
			message.role === "assistant" && styles.left,
			message.role === "user" && styles.right,
		)}
	>
		<strong className={styles.role}>{message.role}:</strong>
		<p>{message.content}</p>
	</div>
);
