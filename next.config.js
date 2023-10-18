/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/(.*)',
        destination: 'https://main--kabax.netlify.app/api/(.*)',
      },
    ]
  },
};

module.exports = nextConfig;
