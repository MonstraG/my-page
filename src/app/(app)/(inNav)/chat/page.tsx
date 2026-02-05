import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import type { Metadata, NextPage } from "next";
import { Chat } from "@/components/chat/Chat.tsx";

export const metadata: Metadata = {
	title: "Chat",
	description: "This is a UI for OpenAI type chat LLMs",
};

const TestPage: NextPage = () => (
	<ArticleContainer style={{ height: "calc(100vh - 48px)" }}>
		<Chat />
	</ArticleContainer>
);

export default TestPage;
