/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	images: { unoptimized: true },
	env: {
		API_GATEWAY_URL: process.env.API_GATEWAY_URL,
	},
	distDir: '.next',
};

export default nextConfig;
