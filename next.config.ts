import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isorepublic.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "patrimonionacional.es",
      },
      {
        protocol: "https",
        hostname: "cdn.shortpixel.ai",
      },
      {
        protocol: "https",
        hostname: "offloadmedia.feverup.com",
      },
    ],
  },
};

export default nextConfig;
