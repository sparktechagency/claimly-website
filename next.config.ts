import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.devtunnels.ms",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "claimly-insurance-server.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1828hp9binr8g.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "13.237.138.182",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
