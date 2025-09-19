import { useLocalMediaContext } from "@/components/video/LocalMediaContextProvider";
import { VideocamIcon } from "@/icons/material/VideocamIcon";
import { VideocamOffIcon } from "@/icons/material/VideocamOffIcon";
import { Button } from "@/ui/Button/Button";
import type { FC } from "react";

export const VideoButton: FC = () => {
	const { localVideoTrack, toggleLocalVideoTrack } = useLocalMediaContext();

	return (
		<Button onClick={toggleLocalVideoTrack} square size="lg">
			{localVideoTrack.enabled ? <VideocamIcon /> : <VideocamOffIcon />}
		</Button>
	);
};
