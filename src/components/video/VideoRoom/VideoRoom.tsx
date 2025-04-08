import { MicButton } from "@/components/video/Controls/MicButton";
import { VideoButton } from "@/components/video/Controls/VideoButton";
import { useTalkToWebsocket } from "@/components/video/useTalkToWebsocket";
import type { MyWebSocket } from "@/components/video/useWebSocketConnection";
import { VideoGrid } from "@/components/video/VideoRoom/VideoGrid";
import { LogoutIcon } from "@/icons/material/LogoutIcon";
import { Button } from "@/ui/Button/Button";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, useCallback } from "react";
import styles from "./VideoRoom.module.css";

interface Props {
	webSocket: MyWebSocket;
	onLeave: () => void;
}

export const VideoRoom: FC<Props> = ({ webSocket, onLeave }) => {
	const { participants, clearParticipants } = useTalkToWebsocket(webSocket);

	const handleLeave = useCallback(
		function cleanup() {
			clearParticipants();
			onLeave();
		},
		[clearParticipants, onLeave],
	);

	return (
		<Stack gap={1} className={styles.room}>
			<VideoGrid participants={participants} />

			<Stack
				direction="row"
				gap={1}
				style={{ justifyContent: "center", alignItems: "center" }}
			>
				<VideoButton />
				<MicButton />
				<Button onClick={handleLeave} startDecorator={<LogoutIcon />} size="lg">
					Leave
				</Button>
			</Stack>
		</Stack>
	);
};
