import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{ hostname: "*.imgix.net", protocol: "https" }] },
  productionBrowserSourceMaps: false, // Disable source maps in development
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

export default nextConfig;
