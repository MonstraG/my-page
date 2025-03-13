import { useEffect, useState } from "react";
import { openSnackbar } from "@/components/SnackbarHost";

function formatError(error: Error) {
	return `${error.name}: ${error.message}`;
}

export const useLocalMediaStream = (): MediaStream | null => {
	const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(null);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					frameRate: { min: 30, max: 60, ideal: 60 },
					width: { min: 1280, ideal: 1920, max: 1920 },
					height: { min: 720, ideal: 1080, max: 1080 }
				},
				audio: true
			})
			.then((mediaStream) => {
				setLocalMediaStream(mediaStream);
			})
			.catch((error: Error) => {
				openSnackbar("error", `Failed to get user media.\n ${formatError(error)}`);
				console.error(error);
			});
	}, []);

	return localMediaStream;
};
