
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BannerWelcome from "./BannerWelcome";
import BannerAvatar from "./BannerAvatar";

const SLIDES = [
  { id: "welcome", Component: BannerWelcome },
  { id: "avatar", Component: BannerAvatar },
];

const INTERVAL = 7000;

const HomeSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const ActiveSlide = SLIDES[index].Component;

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={SLIDES[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <ActiveSlide />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomeSlider;


