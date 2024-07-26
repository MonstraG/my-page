/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/u/17963791/**"
			}
		],
		imageSizes: [64, 128, 256, 384],
		deviceSizes: [640, 828, 1080, 1536, 1920]
	},
	modularizeImports: {
		"@mui/icons-material": {
			transform: "@mui/icons-material/{{member}}"
		}
	}
};

/**
 * @param config {import('next').NextConfig}
 * @returns {Promise<import('next').NextConfig>}
 */
const optionalWithBundleAnalyzer = async (config) => {
	if (process.env.ANALYZE === "true") {
		const withBundleAnalyzer = await import("@next/bundle-analyzer").then((m) => m.default);
		return withBundleAnalyzer({
			enabled: true,
			openAnalyzer: false
		})(config);
	}
	return config;
};

export default optionalWithBundleAnalyzer(nextConfig);
