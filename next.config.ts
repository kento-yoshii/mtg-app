import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        tls: false,
        net: false,
        http: false,
        https: false,
      };
    }
    return config;
  },
};

export default nextConfig;
