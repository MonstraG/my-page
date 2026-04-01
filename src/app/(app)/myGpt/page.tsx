import type { Metadata, NextPage } from "next";
import { Chat } from "@/components/chat/Chat";
import { allPages, getMetadata } from "@/components/nav/pages";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";

export const metadata: Metadata = getMetadata(allPages.myGpt);

const MyGptPage: NextPage = () => (
	<MainLayout path={allPages.myGpt.title} width="narrow">
		<Chat />
	</MainLayout>
);

export default MyGptPage;
