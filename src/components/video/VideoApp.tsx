"use client";
import type { FC } from "react";
import { Stack } from "@/ui/Stack/Stack";
import { VideoPreJoin } from "@/components/video/VideoPreJoin";
import { useLocalMediaStream } from "@/components/video/useLocalMediaStream";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import type { FCC } from "@/types/react";

interface Props {
	roomId: string;
}

export const VideoApp: FC<Props> = ({ roomId }) => {
	const { localMediaStream, error } = useLocalMediaStream();

	if (error) {
		return (
			<VideoAppIntroCard>
				<Stack style={{ textAlign: "center", alignItems: "center" }} gap={2}>
					<h1>Error</h1>
					<Stack gap={1}>
						<h5>There has been an issue accessing your media stream.</h5>
						<Paragraph>Make sure you've allowed access and reload the page.</Paragraph>
					</Stack>
				</Stack>
			</VideoAppIntroCard>
		);
	}

	if (!localMediaStream) {
		return (
			<VideoAppIntroCard>
				<Stack
					style={{ textAlign: "center", alignItems: "center", marginBottom: "3rem" }}
					gap={2}
				>
					<h1>You are entering video chat</h1>
					<Paragraph>
						In order to proceed, please, allow the use of video and microphone
					</Paragraph>
				</Stack>

				<div>
					<Paragraph size="sm">You are entering room</Paragraph>
					<Paragraph>
						<code>{roomId}</code>
					</Paragraph>
				</div>
			</VideoAppIntroCard>
		);
	}

	return (
		<Stack style={{ minHeight: "100%" }}>
			<h1>Video</h1>

			<VideoPreJoin localMediaStream={localMediaStream} roomId={roomId} />
		</Stack>
	);
};

const VideoAppIntroCard: FCC = ({ children }) => (
	<Stack
		style={{
			minHeight: "100vh",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center"
		}}
	>
		<Sheet style={{ padding: "3rem" }}>{children}</Sheet>
	</Stack>
);
