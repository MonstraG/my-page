"use client";
import { MicButton } from "@/components/video/MicButton";
import {
	getWebSocketConnection,
	type MyWebSocket,
} from "@/components/video/useWebSocketConnection";
import { VideoAppIntroCard } from "@/components/video/VideoAppIntroCard";
import { VideoButton } from "@/components/video/VideoButton";
import { LocalVideoElement } from "@/components/video/VideoElement/LocalVideoElement";
import { VideoRoom } from "@/components/video/VideoRoom";
import { LoginIcon } from "@/icons/material/LoginIcon";
import { Button } from "@/ui/Button/Button";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, useCallback, useState } from "react";

// https://github.com/feross/simple-peer

interface Props {
	roomId: string;
}

export const VideoPreJoin: FC<Props> = ({ roomId }) => {
	const [webSocket, setWebsocket] = useState<MyWebSocket | null>(null);

	const handleJoin = useCallback(function join(roomId: string) {
		setWebsocket(getWebSocketConnection(roomId));
	}, []);

	const handleLeave = useCallback(function destroyWebSocket() {
		setWebsocket((prev) => {
			prev?.cleanup();
			return null;
		});
	}, []);

	if (!webSocket) {
		return (
			<VideoAppIntroCard>
				<Stack direction="row" gap={4} style={{ alignItems: "center" }}>
					<Stack direction="column" gap={2} style={{ width: "600px" }}>
						<LocalVideoElement />
						<Stack direction="row" style={{ justifyContent: "center" }} gap={2}>
							<VideoButton />

							<MicButton />
						</Stack>
					</Stack>

					<Stack gap={1} style={{ alignItems: "center" }}>
						<Paragraph>When you are ready, click the button below</Paragraph>
						<Button
							size="lg"
							onClick={() => handleJoin(roomId)}
							startDecorator={<LoginIcon />}
						>
							Enter room
						</Button>
					</Stack>
				</Stack>
			</VideoAppIntroCard>
		);
	}

	return <VideoRoom webSocket={webSocket} onLeave={handleLeave} />;
};
