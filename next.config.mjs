/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "steamcdn-a.akamaihd.net",
      },
      {
        hostname: "cdn.cloudflare.steamstatic.com",
      },
      {
        hostname: "avatars.akamai.steamstatic.com",
      },
      {
        hostname: "avatars.steamstatic.com",
      },
    ],
  },
};

export default nextConfig;
