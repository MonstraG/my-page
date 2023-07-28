import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		imageSizes: [32, 48, 64, 80, 96, 128, 256, 384],
		deviceSizes: [640, 828, 1080, 1536, 1920, 2048]
	}
};

export default withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
	openAnalyzer: false
})(nextConfig);
