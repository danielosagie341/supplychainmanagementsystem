import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... your existing config
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// CHANGE THIS LINE:
export default nextConfig; 