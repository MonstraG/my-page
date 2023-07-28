import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: false,
	images: {
		imageSizes: [32, 48, 64, 80, 96, 128, 256, 384],
		deviceSizes: [640, 828, 1080, 1536, 1920, 2048]
	},
	eslint: {
		dirs: ["src"]
	}
};

export default withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
	openAnalyzer: false
})(nextConfig);
