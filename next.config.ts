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
  ],
},
};

module.exports = nextConfig;
