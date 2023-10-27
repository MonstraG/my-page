import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
let nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "**"
			}
		],
		imageSizes: [32, 48, 64, 80, 96, 128, 256, 384],
		deviceSizes: [640, 828, 1080, 1536, 1920]
	},
	modularizeImports: {
		"@mui/base": {
			transform: "@mui/base/{{member}}"
		},
		"@mui/icons-material": {
			transform: "@mui/icons-material/{{member}}"
		},
		"@mui/joy": {
			transform: "@mui/joy/{{member}}"
		}
	}
};

if (process.env.ANALYZE === "true") {
	nextConfig = withBundleAnalyzer({
		enabled: true,
		openAnalyzer: false
	})(nextConfig);
}

export default nextConfig;
