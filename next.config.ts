import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

if (process.env.NEXT_STANDALONE === "true") {
	nextConfig.output = "standalone";
}

export default nextConfig;
