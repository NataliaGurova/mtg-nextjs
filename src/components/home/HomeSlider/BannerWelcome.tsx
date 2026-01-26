
import Image from "next/image";

const BannerWelcome = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/home3-1.jpg"
        alt="Welcome to Magic the Gathering"
        width={1720}
        height={500}
        // className="object-cover"
        priority
      />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1
            className={`
              mt-20
              text-[38px]
              font-semibold
              font-inter
              tracking-[0.15em]
              uppercase
              text-[#F5F0E6]
              drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]
            `}>
            Вітаю в
          </h1>

          {/* <p className="mt-1 text-[32px] tracking-wide">в</p> */}
          <div
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              px-6 py-4
            "
          >

            <Image
              src="/citadel.jpg"
              alt="MTG Logo"
              width={140}
              height={120}
              priority
            />
            <span className="ml-4 text-[58px] font-semibold">Citadel</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerWelcome;
