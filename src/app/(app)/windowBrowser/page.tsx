import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { WindowBrowser } from "@/components/WindowBrowser";
import { allPages, getMetadata } from "@/components/nav/pages";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";

export const metadata: Metadata = getMetadata(allPages.windowBrowser);

const WindowBrowserPage: NextPage = () => {
	return (
		<MainLayout path={allPages.windowBrowser.title}>
			<Stack component="article" gap={1}>
				<h1>Window browser</h1>
				<p>This is all properties of the `window` object on your device in this tab:</p>
				<WindowBrowser />
			</Stack>
		</MainLayout>
	);
};

export default WindowBrowserPage;
