/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: false,
	async redirects() {
		return [
			{
				source: "/",
				destination: "/me",
				permanent: false
			}
		];
	},
	eslint: {
		dirs: ["src"]
	}
};

module.exports = nextConfig;
