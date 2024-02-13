import { type FC, useRef } from "react";
import Box from "@mui/joy/Box";

const blockSize = 4;
const gap = 1;
const offset = blockSize + gap;

function roundDown(x: number, precision: number) {
	return Math.floor(x / precision) * precision;
}

interface Props {
	totalWords: number;
	known: number[];
	unknown: number[];
	invalid: number[];
}

export const AnswerMap: FC<Props> = ({ totalWords, known, unknown, invalid }) => {
	const ref = useRef<HTMLCanvasElement | null>(null);
	const canvas = ref.current;
	if (canvas) {
		const parent = canvas.parentElement;
		if (parent) {
			canvas.width = roundDown(parent.clientWidth, offset);
			canvas.height = (totalWords / parent.clientWidth) * offset * offset;
		}

		const ctx = canvas.getContext("2d");

		let maxX = 0;
		let maxY = 0;
		if (ctx) {
			const width = canvas.width;

			for (let i = 0; i < totalWords; i++) {
				const left = i * offset;
				const top = Math.floor(left / width);

				const x = left % width;
				const y = top * offset;

				maxX = Math.max(maxX, x);
				maxY = Math.max(maxY, y);

				if (known.includes(i)) {
					ctx.fillStyle = "green";
				} else if (unknown.includes(i)) {
					ctx.fillStyle = "red";
				} else if (invalid.includes(i)) {
					ctx.fillStyle = "darkgray";
				} else {
					ctx.fillStyle = "lightgray";
				}

				ctx.fillRect(x, y, blockSize, blockSize);
			}
		}
	}

	return (
		<Box sx={{ width: "100%", minHeight: "300px" }}>
			<canvas ref={ref}></canvas>
		</Box>
	);
};
