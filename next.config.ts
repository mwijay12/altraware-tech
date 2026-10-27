import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@/components": "./components",
      "@/lib": "./lib",
    },
  },
};

export default nextConfig;
