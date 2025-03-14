import type { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import "@/ui/reset.css";
import "@/ui/global.css";
import { VideoApp } from "@/components/video/VideoApp";
import { SnackbarHost } from "@/components/SnackbarHost";

export const metadata: Metadata = {
	title: "Video"
};

const VideoPage: NextPage<{ params: Promise<{ roomId: string }> }> = async ({ params }) => {
	const resolvedParams = await params;
	if (!resolvedParams.roomId) {
		notFound();
	}

	return (
		<>
			<VideoApp roomId={resolvedParams.roomId} />
			<SnackbarHost />
		</>
	);
};

export default VideoPage;
