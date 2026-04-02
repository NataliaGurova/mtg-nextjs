// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 🔹 Добавляем или обновляем семейство шрифтов
      fontFamily: {
        // Теперь класс 'font-sans' будет использовать Montserrat
        sans: ["var(--font-montserrat)", "sans-serif"], 
      },
      // ... ваши остальные цвета и настройки
    },
  },
  plugins: [],
};

export default config;