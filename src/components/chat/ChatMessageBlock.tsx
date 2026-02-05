import type { FC, MouseEvent } from "react";
import type { ChatMessage } from "@/components/chat/Chat.types.ts";
import styles from "./ChatMessageBlock.module.css";
import { cn } from "@/functions/cn.ts";

interface Props {
	message: ChatMessage;
	onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const ChatMessageBlock: FC<Props> = ({ message, onContextMenu }) => (
	<div
		className={cn(
			styles.block,
			message.role === "assistant" && styles.left,
			message.role === "user" && styles.right,
		)}
		onContextMenu={onContextMenu}
		role="menu"
	>
		<strong className={styles.role}>{message.role}:</strong>
		<p>{message.content}</p>
	</div>
);
