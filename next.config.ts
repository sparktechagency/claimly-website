import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.devtunnels.ms",
      },
      {
        protocol: "https",
        hostname: "claimly-insurance-server.vercel.app",
      },
      {
        protocol: "https",
        hostname: "d1828hp9binr8g.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
