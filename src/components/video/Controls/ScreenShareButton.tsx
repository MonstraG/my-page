import { useLocalMediaContext } from "@/components/video/LocalMediaContextProvider";
import { ScreenShareIcon } from "@/icons/material/ScreenShareIcon";
import { StopScreenShareIcon } from "@/icons/material/StopScreenShareIcon";
import { Button } from "@/ui/Button/Button";
import type { FC } from "react";

export const ScreenShareButton: FC = () => {
	const { localScreenShareStream, handleStartScreenShare, handleStopScreenShare } =
		useLocalMediaContext();

	return (
		<Button
			onClick={localScreenShareStream ? handleStopScreenShare : handleStartScreenShare}
			square
			size="lg"
		>
			{localScreenShareStream ? <StopScreenShareIcon /> : <ScreenShareIcon />}
		</Button>
	);
};
