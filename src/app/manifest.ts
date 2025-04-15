import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "arsga.eu",
		short_name: "arsga",
		description: "Collection of my tools",
		start_url: "/",
		display: "minimal-ui",
		background_color: "#060606",
		theme_color: "#fff",
		icons: [
			{
				src: "/icon/192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon/512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
