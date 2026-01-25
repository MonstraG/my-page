import { MyAvatarIcon } from "@/icons/custom/MyAvatarIcon.tsx";
import { ImageResponse } from "next/og";

export const size = {
	width: 512,
	height: 512,
};

export const contentType = "image/png";

export default function Icon3(): ImageResponse {
	return new ImageResponse(<MyAvatarIcon {...size} />, { ...size });
}
