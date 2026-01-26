"use client";
import type { FCC } from "@/types/react";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { useOpenSnackbar } from "@/components/snack/Snackbars.tsx";

interface LocalTrack {
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

	const toggleLocalTrack = () => {
		setLocalTrack((prev) => {
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
	};

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
}

const LocalMediaContext = createContext<LocalMediaState | null>(null);

function formatError(error: unknown) {
	if (error instanceof Error) {
		return `${error.name}: ${error.message}`;
	}
	return String(error);
}

export const LocalMediaContextProvider: FCC = ({ children }) => {
	const [localMediaStream, setLocalMediaStream] = useState<MediaStream | undefined>(undefined);
	const [error, setError] = useState<boolean>(false);
	const [ready, setReady] = useState<boolean>(false);

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

	const openSnackbar = useOpenSnackbar();

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
				setLocalVideoTrack((prev) => ({ track: videoTrack, enabled: prev.enabled }));

				const audioTrack = mediaStream.getAudioTracks().at(0);
				setLocalAudioTrack((prev) => ({ track: audioTrack, enabled: prev.enabled }));

				setReady(true);
			})
			.catch((streamError: unknown) => {
				openSnackbar("error", `Failed to get user media.\n ${formatError(streamError)}`);
				setError(true);
				console.error(streamError);
			});
	}, [setLocalAudioTrack, setLocalVideoTrack, openSnackbar]);

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
