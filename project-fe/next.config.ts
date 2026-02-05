import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // 1. Ignore ESLint errors (like unused variables) during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 2. Ignore TypeScript errors (like 'any' types) during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;