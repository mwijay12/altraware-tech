import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  turbopack: {
    resolveAlias: {
      "@/components": "./components",
      "@/lib": "./lib",
    },
  },
};

export default nextConfig;
