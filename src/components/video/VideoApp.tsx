"use client";
import { useLocalMediaContext } from "@/components/video/LocalMediaContextProvider";
import { VideoAppIntroCard } from "@/components/video/VideoAppIntroCard";
import { VideoPreJoin } from "@/components/video/VideoPreJoin";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { FC } from "react";

interface Props {
	roomId: string;
}

export const VideoApp: FC<Props> = ({ roomId }) => {
	const { error, ready } = useLocalMediaContext();

	if (error) {
		return (
			<VideoAppIntroCard>
				<Stack style={{ textAlign: "center", alignItems: "center" }} gap={2}>
					<h1>Error</h1>
					<Stack gap={1}>
						<h5>There has been an issue accessing your media stream.</h5>
						<Paragraph>
							Make sure you've allowed access, then reload the page.
						</Paragraph>
					</Stack>
				</Stack>
			</VideoAppIntroCard>
		);
	}

	if (!ready) {
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
			<VideoPreJoin roomId={roomId} />
		</Stack>
	);
};
