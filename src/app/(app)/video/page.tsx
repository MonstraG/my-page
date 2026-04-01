import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { VideoStartButton } from "@/components/video/VideoStartButton";
import { allPages, getMetadata } from "@/components/nav/pages";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";

export const metadata: Metadata = getMetadata(allPages.video);

const VideoStartPage: NextPage = () => {
	return (
		<MainLayout path={allPages.video.title}>
			<Stack component="article" gap={1}>
				<h1>Video</h1>
				<p>
					Click the button below to enter into a room, and then share the link with other
					people
				</p>
				<div>
					<VideoStartButton />
				</div>
			</Stack>
		</MainLayout>
	);
};

export default VideoStartPage;
