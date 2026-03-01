import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
};

export default nextConfig;
