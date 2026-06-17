import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid Next inferring /Users/venkatarevanth as the monorepo root (parent lockfile).
  outputFileTracingRoot: path.join(__dirname),
  devIndicators: false,
};

export default nextConfig;
