import type { Metadata, NextPage } from "next";
import { Container } from "@/ui/Container/Container";
import { Stack } from "@/ui/Stack/Stack";
import { VideoChat } from "@/components/video/VideoChat";

export const metadata: Metadata = {
	title: "Video"
};

const VideoPage: NextPage = () => {
	const roomId = "1";

	return (
		<Container>
			<Stack gap={4}>
				<h1>Video</h1>

				{roomId && <VideoChat roomId={roomId} />}
			</Stack>
		</Container>
	);
};

export default VideoPage;
