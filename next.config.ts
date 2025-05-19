import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/sp_website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
