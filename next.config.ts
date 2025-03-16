import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*", // Match all API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          }, // Allow all methods
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          }, // Allow specific headers
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
