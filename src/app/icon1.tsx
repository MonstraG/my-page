import { MyAvatarIcon } from "@/icons/custom/MyAvatarIcon.tsx";
import { ImageResponse } from "next/og";

export const size = {
	width: 96,
	height: 96,
};

export const contentType = "image/png";

export default function Icon1(): ImageResponse {
	return new ImageResponse(<MyAvatarIcon {...size} />, { ...size });
}
