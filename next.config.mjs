/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "**"
			},
			{
				protocol: "https",
				hostname: "imgs.xkcd.com",
				pathname: "/comics/things_you_should_not_do.png"
			},
			{
				protocol: "https",
				hostname: "user-images.githubusercontent.com",
				pathname: "/994900/218720566-e5b3ab22-d7fc-4df7-a777-ad9b6280ada8.png"
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
