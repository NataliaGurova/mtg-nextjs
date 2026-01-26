"use client";

import { useEffect, useState } from "react";
import BannerAvatar from "./HomeSlider/BannerAvatar";
import Image from "next/image";

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 2);
    }, 7000); // 7 секунд

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[556px] w-full overflow-hidden">
      {/* SLIDE 1 */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-1000
          ${index === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}
        `}
      >
        <Image
          src="/images/home3-1.jpg"
          alt="Welcome banner"
          width={1700}
          height={100}
          // fill
          className="object-cover"
          priority
        />
      </div>

      {/* SLIDE 2 */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-1000
          ${index === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}
        `}
      >
        <BannerAvatar />
      </div>
    </section>
  );
};

export default HeroSlider;
