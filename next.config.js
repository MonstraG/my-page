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
	}
};

module.exports = nextConfig;
