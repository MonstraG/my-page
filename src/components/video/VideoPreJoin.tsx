"use client";
import { type FC, useCallback, useState } from "react";
import {
	getWebSocketConnection,
	type MyWebSocket
} from "@/components/video/useWebSocketConnection";
import { Button } from "@/ui/Button/Button";
import { LocalVideoElement } from "@/components/video/VideoElement/LocalVideoElement";
import { VideoRoom } from "@/components/video/VideoRoom";

// https://github.com/feross/simple-peer

interface Props {
	localMediaStream: MediaStream;
	roomId: string;
}

export const VideoPreJoin: FC<Props> = ({ localMediaStream, roomId }) => {
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
			<div>
				<Button onClick={() => handleJoin(roomId)}>Join</Button>
				<LocalVideoElement mediaStream={localMediaStream} />
			</div>
		);
	}

	return (
		<VideoRoom
			localMediaStream={localMediaStream}
			webSocket={webSocket}
			onLeave={handleLeave}
		/>
	);
};
