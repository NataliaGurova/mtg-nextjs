import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
  dangerouslyAllowSVG: true, // Обязательно для иконок сетов
  remotePatterns: [
    {
      // Для картинок самих карт Magic
      protocol: "https",
      hostname: "cards.scryfall.io",
      port: "",
      pathname: "/**",
    },
    {
      // Для иконок сетов (Secret Lair и других)
      protocol: "https",
      hostname: "svgs.scryfall.io",
      port: "",
      pathname: "/sets/**",
    },
    {
        protocol: "https",
        hostname: "images.ctfassets.net", // ← добавьте нужный хост
        port: "",
        pathname: "/**",
      },
    {
        protocol: "https",
        hostname: "api.scryfall.com",
        port: "",
        pathname: "/**",
      },
  ],
},
};

module.exports = nextConfig;
