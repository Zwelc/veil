import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Steam CDNs already serve sized images; skipping Next's optimizer avoids
    // paid image-optimization usage on Vercel. Remote hosts are still allow-listed
    // so optimization can be re-enabled without other changes.
    unoptimized: true,
    remotePatterns: [
      { hostname: "steamcdn-a.akamaihd.net" },
      { hostname: "cdn.cloudflare.steamstatic.com" },
      { hostname: "avatars.akamai.steamstatic.com" },
      { hostname: "avatars.steamstatic.com" },
    ],
  },
};

export default nextConfig;
