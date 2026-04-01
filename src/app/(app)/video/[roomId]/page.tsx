import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import "@/ui/reset.css";
import "@/ui/global.css";
import { LocalMediaContextProvider } from "@/components/video/LocalMediaContextProvider";
import { VideoApp } from "@/components/video/VideoApp";
import { allPages, getMetadata } from "@/components/nav/pages";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";

export const metadata: Metadata = getMetadata(allPages.video);

const VideoPage: NextPage<{ params: Promise<{ roomId: string }> }> = async ({ params }) => {
	const resolvedParams = await params;
	if (!resolvedParams.roomId) {
		notFound();
	}

	return (
		<MainLayout path={allPages.video.title} width="wide">
			<LocalMediaContextProvider>
				<VideoApp roomId={resolvedParams.roomId} />
			</LocalMediaContextProvider>
		</MainLayout>
	);
};

export default VideoPage;
