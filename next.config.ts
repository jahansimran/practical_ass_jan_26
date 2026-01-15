import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
  },
  output: "standalone",
};

export default nextConfig;
