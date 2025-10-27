import { MyIcon } from "@/icons/MyIcon";
import { ImageResponse } from "next/og";

export const size = {
	width: 192,
	height: 192,
};

export const contentType = "image/png";

export default function Icon2(): ImageResponse {
	return new ImageResponse(<MyIcon {...size} />, { ...size });
}
