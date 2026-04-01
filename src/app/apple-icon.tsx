import { MyAvatarIcon } from "@/icons/custom/MyAvatarIcon";
import { ImageResponse } from "next/og";

export const size = {
	width: 180,
	height: 180,
};

export const contentType = "image/png";

const AppleIcon = (): ImageResponse => {
	return new ImageResponse(<MyAvatarIcon {...size} />, { ...size });
};

export default AppleIcon;
