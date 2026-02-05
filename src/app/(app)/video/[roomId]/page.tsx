import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import "@/ui/reset.css";
import "@/ui/global.css";
import { LocalMediaContextProvider } from "@/components/video/LocalMediaContextProvider";
import { VideoApp } from "@/components/video/VideoApp";

export const metadata: Metadata = {
	title: "Video",
	description: "p2p video chat",
};

const VideoPage: NextPage<{ params: Promise<{ roomId: string }> }> = async ({ params }) => {
	const resolvedParams = await params;
	if (!resolvedParams.roomId) {
		notFound();
	}

	return (
		<LocalMediaContextProvider>
			<VideoApp roomId={resolvedParams.roomId} />
		</LocalMediaContextProvider>
	);
};

export default VideoPage;
