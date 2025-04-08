import type { Participant } from "@/components/video/video.types";
import { LocalVideoElement } from "@/components/video/VideoElement/LocalVideoElement";
import { ParticipantVideoElement } from "@/components/video/VideoElement/ParticipantVideoElement";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
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
	participants: Participant[];
}

export const VideoGrid: FC<Props> = ({ participants }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				setDimensions({
					width: containerRef.current.offsetWidth,
					height: containerRef.current.offsetHeight,
				});
			}
		};

		document.addEventListener("resize", updateSize);
		updateSize();

		return () => document.removeEventListener("resize", updateSize);
	}, []);

	const style = useMemo(() => {
		const totalParticipants = participants.length + 1; // and me
		const { cols, rows } = calculateBestLayout(totalParticipants, dimensions);

		return {
			gridTemplateColumns: `repeat(${cols}, 1fr)`,
			gridTemplateRows: `repeat(${rows}, 1fr)`,
		};
	}, [participants.length, dimensions]);

	return (
		<div
			className={styles.grid}
			style={style}
			ref={containerRef}
		>
			<LocalVideoElement />

			{participants.map((participant) => (
				<ParticipantVideoElement participant={participant} key={participant.id} />
			))}
		</div>
	);
};
