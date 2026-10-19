import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aktifkan kompresi Gzip/Brotli untuk seluruh response
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Optimasi impor modul besar (lucide-react memiliki 1500+ icons)
  // Mencegah Webpack/Turbopack mengompilasi seluruh icon yang menyebabkan freeze pada Windows
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "sonner",
      "clsx",
      "tailwind-merge",
      "zustand",
    ],
  },

  // Cache header untuk aset statis (frames, PNG, SVG) agar browser tidak request ulang
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

