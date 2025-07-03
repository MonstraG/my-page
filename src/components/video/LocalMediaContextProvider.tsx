"use client";
import { openSnackbar } from "@/components/snackbarHost/useSnackbarStore";
import type { FCC } from "@/types/react";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export interface LocalTrack {
	track: MediaStreamTrack | undefined;
	enabled: boolean;
}

function useLocalTrack(): {
	localTrack: LocalTrack;
	setLocalTrack: Dispatch<SetStateAction<LocalTrack>>;
	toggleLocalTrack: () => void;
} {
	const [localTrack, setLocalTrack] = useState<LocalTrack>({
		track: undefined,
		enabled: true,
	});

	const toggleLocalTrack = useCallback(() => {
		setLocalTrack(prev => {
			if (prev.track == null) {
				return prev;
			}

			const newEnabled = !prev.enabled;

			prev.track.enabled = newEnabled;
			return {
				track: prev.track,
				enabled: newEnabled,
			};
		});
	}, []);

	return { localTrack, setLocalTrack, toggleLocalTrack };
}

interface LocalMediaState {
	localMediaStream: MediaStream | undefined;
	localVideoTrack: LocalTrack;
	toggleLocalVideoTrack: () => void;
	localAudioTrack: LocalTrack;
	toggleLocalAudioTrack: () => void;
	error: boolean;
	ready: boolean;
	handleStartScreenShare: () => void;
	handleStopScreenShare: () => void;
	localScreenShareStream: MediaStream | undefined;
	localScreenShareTrack: LocalTrack;
	setReadyAnyway: () => void;
}

const LocalMediaContext = createContext<LocalMediaState | null>(null);

function formatError(error: Error) {
	return `${error.name}: ${error.message}`;
}

export const LocalMediaContextProvider: FCC = ({ children }) => {
	const [localMediaStream, setLocalMediaStream] = useState<MediaStream | undefined>(undefined);
	const [localScreenShareStream, setLocalScreenShareStream] = useState<MediaStream | undefined>(
		undefined,
	);
	const [error, setError] = useState<boolean>(false);
	const [ready, setReady] = useState<boolean>(false);

	const setReadyAnyway = useCallback(() => {
		setReady(true);
		setError(false);
	}, []);

	const {
		localTrack: localVideoTrack,
		setLocalTrack: setLocalVideoTrack,
		toggleLocalTrack: toggleLocalVideoTrack,
	} = useLocalTrack();
	const {
		localTrack: localAudioTrack,
		setLocalTrack: setLocalAudioTrack,
		toggleLocalTrack: toggleLocalAudioTrack,
	} = useLocalTrack();

	const {
		localTrack: localScreenShareTrack,
		setLocalTrack: setLocalScreenShareTrack,
	} = useLocalTrack();

	useEffect(() => {
		setError(false);
		setReady(false);
		navigator.mediaDevices
			.getUserMedia({
				video: {
					frameRate: { min: 30, max: 60, ideal: 60 },
					width: { min: 1280, ideal: 1920, max: 1920 },
					height: { min: 720, ideal: 1080, max: 1080 },
				},
				audio: true,
			})
			.then((mediaStream) => {
				setLocalMediaStream(mediaStream);

				const videoTrack = mediaStream.getVideoTracks().at(0);
				setLocalVideoTrack(prev => ({ track: videoTrack, enabled: prev.enabled }));

				const audioTrack = mediaStream.getAudioTracks().at(0);
				setLocalAudioTrack(prev => ({ track: audioTrack, enabled: prev.enabled }));

				setReady(true);
			})
			.catch((error: Error) => {
				openSnackbar("error", `Failed to get user media.\n ${formatError(error)}`);
				setError(true);
				console.error(error);
			});
	}, [setLocalAudioTrack, setLocalVideoTrack]);

	const handleStartScreenShare = useCallback(() => {
		navigator.mediaDevices
			.getDisplayMedia()
			.then((mediaStream) => {
				setLocalScreenShareStream(mediaStream);

				const videoTrack = mediaStream.getVideoTracks()[0];
				setLocalScreenShareTrack({ track: videoTrack, enabled: true });

				if (!localMediaStream) {
					console.error("Missing local media stream to add screen share track to!");
					return;
				}
			})
			.catch((error: Error) => {
				openSnackbar("error", `Failed to get display media.\n ${formatError(error)}`);
				console.error(error);
			});
	}, [localMediaStream, setLocalScreenShareTrack]);

	const handleStopScreenShare = useCallback(() => {
		setLocalScreenShareStream(prev => {
			if (prev) {
				prev.getTracks().map(track => track.stop());
			}
			return undefined;
		});
		setLocalScreenShareTrack({ track: undefined, enabled: false });
	}, [setLocalScreenShareTrack]);

	return (
		<LocalMediaContext.Provider
			value={{
				localMediaStream,
				localVideoTrack,
				toggleLocalVideoTrack,
				localAudioTrack,
				toggleLocalAudioTrack,
				error,
				ready,
				handleStartScreenShare,
				handleStopScreenShare,
				localScreenShareStream,
				localScreenShareTrack,
				setReadyAnyway,
			}}
		>
			{children}
		</LocalMediaContext.Provider>
	);
};

export function useLocalMediaContext(): LocalMediaState {
	const state = useContext(LocalMediaContext);
	if (state == null) {
		throw new Error("useLocalMediaContext must be used within LocalMediaContextProvider");
	}
	return state;
}
