import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Portfolio screenshots only change via deliberate content updates, so
    // keep optimized variants cached at the edge for 30 days instead of
    // re-fetching whenever the upstream max-age (1h) lapses
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        // Supabase Storage — partner logos + portfolio assets
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

export default nextConfig;
