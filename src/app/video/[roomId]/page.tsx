import type { Metadata, NextPage } from "next";
import { Container } from "@/ui/Container/Container";
import { Stack } from "@/ui/Stack/Stack";
import { VideoChat } from "@/components/video/VideoChat";
import { notFound } from "next/navigation";
import "@/ui/reset.css";
import "@/ui/global.css";

export const metadata: Metadata = {
	title: "Video"
};

const VideoPage: NextPage<{ params: Promise<{ roomId: string }> }> = async ({ params }) => {
	const resolvedParams = await params;
	if (!resolvedParams.roomId) {
		notFound();
	}

	return (
		<Container>
			<Stack gap={4}>
				<h1>Video</h1>
				<h2>RoomId: {resolvedParams.roomId}</h2>

				<VideoChat roomId={resolvedParams.roomId} />
			</Stack>
		</Container>
	);
};

export default VideoPage;
