import { useLocalMediaContext } from "@/components/video/LocalMediaContextProvider";
import { MicIcon } from "@/icons/material/MicIcon";
import { MicOffIcon } from "@/icons/material/MicOffIcon";
import { Button } from "@/ui/Button/Button";
import type { FC } from "react";

export const MicButton: FC = () => {
	const { localAudioTrack, toggleLocalAudioTrack } = useLocalMediaContext();

	return (
		<Button onClick={toggleLocalAudioTrack} square size="lg">
			{localAudioTrack.enabled ? <MicIcon /> : <MicOffIcon />}
		</Button>
	);
};
