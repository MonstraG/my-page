import { useLocalMediaContext } from "@/components/video/LocalMediaContextProvider";
import type { Participant } from "@/components/video/video.types";
import { LocalVideoElement } from "@/components/video/VideoElement/LocalVideoElement";
import { ParticipantVideoElement } from "@/components/video/VideoElement/ParticipantVideoElement";
import { type FC, useCallback, useMemo, useState } from "react";
import styles from "./VideoGrid.module.css";

interface Dimensions {
	width: number;
	height: number;
}

function calculateBestLayout(
	participants: number,
	dimensions: Dimensions,
): { rows: number; cols: number; area: number } {
	const cellAspectRatio = 16 / 9;

	let bestLayout = { rows: 1, cols: participants, area: 0 };
	for (let cols = 1; cols <= participants; cols++) {
		const rows = Math.ceil(participants / cols);
		const cellWidth = dimensions.width / cols;
		const cellHeight = dimensions.height / rows;

		const cellEffectiveHeight = Math.min(cellHeight, cellWidth / cellAspectRatio);
		const cellEffectiveWidth = cellEffectiveHeight * cellAspectRatio;

		const area = cellEffectiveWidth * cellEffectiveHeight;

		if (area > bestLayout.area) {
			bestLayout = { rows, cols, area };
		}
	}

	return bestLayout;
}

interface Props {
	participants: readonly Participant[];
}

export const VideoGrid: FC<Props> = ({ participants }) => {
	const { localVideoTrack, localScreenShareTrack } = useLocalMediaContext();

	const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
	const watchSize = useCallback((element: HTMLDivElement | null) => {
		if (!element) {
			return;
		}
		const resizeObserver = new ResizeObserver(entries => {
			const target = entries[0];
			setDimensions({
				width: target.contentRect.width,
				height: target.contentRect.height,
			});
		});
		resizeObserver.observe(element);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const style = useMemo(() => {
		const ownVideo = 1;
		const ownScreenShare = localScreenShareTrack.track ? 1 : 0;
		const totalParticipants = participants.length + ownVideo + ownScreenShare;
		const { cols, rows } = calculateBestLayout(totalParticipants, dimensions);

		return {
			gridTemplateColumns: `repeat(${cols}, 1fr)`,
			gridTemplateRows: `repeat(${rows}, 1fr)`,
		};
	}, [localScreenShareTrack.track, participants.length, dimensions]);

	return (
		<div
			className={styles.grid}
			style={style}
			ref={watchSize}
		>
			<LocalVideoElement localVideoTrack={localVideoTrack} title="Local participant" />
			{localScreenShareTrack.track && (
				<LocalVideoElement
					localVideoTrack={localScreenShareTrack}
					title="Local screen share"
				/>
			)}

			{participants.map((participant) => (
				<ParticipantVideoElement participant={participant} key={participant.id} />
			))}
		</div>
	);
};
