import { MyIcon } from "@/icons/MyIcon";
import { ImageResponse } from "next/og";

export const size = {
	width: 180,
	height: 180,
};

export const contentType = "image/png";

const AppleIcon = (): ImageResponse => {
	return new ImageResponse(<MyIcon {...size} />, { ...size });
};

export default AppleIcon;
