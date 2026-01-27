"use client";
import { type FC, useState } from "react";
import { ChatConnectionForm } from "@/components/chat/ChatConnectionForm.tsx";
import { Stack } from "@/ui/Stack/Stack.tsx";
import { ChatSettingsSection } from "@/components/chat/ChatSettingsSection.tsx";
import { ChatContent } from "@/components/chat/ChatContent.tsx";
import type { ChatConnection } from "@/components/chat/Chat.types.ts";

export const Chat: FC = () => {
	const [connection, setConnection] = useState<ChatConnection>({
		ok: false,
		models: [],
		url: undefined,
	});

	const [model, setModel] = useState<string | undefined>(undefined);

	/// ---

	if (!connection.ok) {
		return <ChatConnectionForm setConnection={setConnection} />;
	}

	return (
		<Stack style={{ height: "100%", justifyContent: "space-between" }}>
			<ChatSettingsSection
				models={connection.models}
				selectedModel={model}
				setSelectedModel={setModel}
			/>
			<ChatContent url={connection.url} model={model} />
		</Stack>
	);
};
