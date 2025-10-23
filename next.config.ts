import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
	reactCompiler: {
		panicThreshold: "all_errors",
	},
	typedRoutes: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/u/17963791/**",
			},
		],
		imageSizes: [64, 128, 256, 384],
		deviceSizes: [640, 828, 1080, 1536, 1920],
	},
};

export default nextConfig;
