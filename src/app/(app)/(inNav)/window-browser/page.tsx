import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { WindowBrowser } from "@/components/WindowBrowser.tsx";

export const metadata: Metadata = {
	title: "Window browser",
	description: "Browse your window object",
};

const WindowBrowserPage: NextPage = () => {
	return (
		<ArticleContainer>
			<Stack component="section" gap={1}>
				<h1>Window browser</h1>
				<p>This is all properties of the `window` object on your device in this tab:</p>
				<WindowBrowser />
			</Stack>
		</ArticleContainer>
	);
};

export default WindowBrowserPage;
