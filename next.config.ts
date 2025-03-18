import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zaebfskdglhmrtrlbddw.supabase.co", // Your Supabase domain
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
