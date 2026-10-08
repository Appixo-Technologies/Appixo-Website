import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "react-icons/si",
      "react-icons/fi",
      "react-icons/fa",
      "react-icons/vsc",
      "react-icons/tb",
    ],
  },
};

export default nextConfig;
