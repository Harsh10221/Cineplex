import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "image.tmdb.org",
        hostname: "www.themoviedb.org",     
       },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        // hostname: "www.themoviedb.org",     
       }

    ],
  },
  // reactStrictMode:false
};

export default nextConfig;
