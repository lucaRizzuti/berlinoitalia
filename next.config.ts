import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Evita che Next risalga oltre la cartella del progetto cercando lockfile.
  turbopack: { root: import.meta.dirname },
  async redirects() {
    return [
      { source: "/impro", destination: "/gutschein", permanent: true },
      { source: "/gutschein/", destination: "/gutschein", permanent: true },
      { source: "/babel", destination: "/spettacoli/babel", permanent: true },
    ];
  },
};

export default nextConfig;
