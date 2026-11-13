import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Stops Next writing an AGENTS.md into the repo.
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 480, 640, 768, 1024, 1280, 1440],
    imageSizes: [96, 160, 256, 320, 400],
  },
};

export default nextConfig;
