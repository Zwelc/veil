/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "steamcdn-a.akamaihd.net",
      "cdn.cloudflare.steamstatic.com",
      "avatars.akamai.steamstatic.com",
    ],
  },
};
module.exports = nextConfig;
