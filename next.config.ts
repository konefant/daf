import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // génère un site 100 % statique dans le dossier "out"
  images: { unoptimized: true },
};

export default nextConfig;