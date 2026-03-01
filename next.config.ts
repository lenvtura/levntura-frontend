import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      {
        protocol: "https",
        hostname: "sfo3.digitaloceanspaces.com",
        port: "",
        pathname: "/levntura/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
