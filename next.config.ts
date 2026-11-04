import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Evita che Next risalga oltre la cartella del progetto cercando lockfile.
  turbopack: { root: import.meta.dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**", search: "" },
    ],
  },
  async redirects() {
    return [
      { source: "/impro", destination: "/gutschein", permanent: true },
      { source: "/gutschein/", destination: "/gutschein", permanent: true },
      { source: "/babel", destination: "/spettacoli/babel", permanent: true },
      // Indirizzi dei QR del pieghevole stampato: temporanei, così la destinazione può cambiare.
      { source: "/prova", destination: "/corsi", permanent: false },
      { source: "/guarda", destination: "/spettacoli", permanent: false },
    ];
  },
};

export default nextConfig;
