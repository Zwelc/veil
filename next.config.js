const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  reactStrictMode: true,
  images: {
    domains: ["steamcdn-a.akamaihd.net", "cdn.cloudflare.steamstatic.com"],
  },
});
