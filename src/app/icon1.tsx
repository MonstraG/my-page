import { MyIcon } from "@/icons/MyIcon";
import { ImageResponse } from "next/og";

export const size = {
	width: 96,
	height: 96,
};

export const contentType = "image/png";

const Icon1 = (): ImageResponse => {
	return new ImageResponse(<MyIcon {...size} />, { ...size });
};

export default Icon1;
