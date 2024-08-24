/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
};

const pwaConfig = withPWA({
  dest: "public",
  sw: "sw.js",
  register: true,
  skipWaiting: true,
});

export default pwaConfig(nextConfig);
