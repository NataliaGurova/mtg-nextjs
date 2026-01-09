import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const BannerAvatar = () => {
  return (
    <section
      className="
        relative
        mx-auto
        w-[1720px] h-[556px]
        overflow-hidden
        
        flex
      "
    >
      {/* LEFT SIDE — clean background */}
      <div
        className="
          w-[1520px]
          h-[556px]
          bg-[#F4F2EB]
          flex  justify-between items-center
          mr-0 
          z-10
        "
      >
        <div className="flex flex-col items-start">
        {/* Text image */}
        <Image
          src="/images/banners/avatar-text.webp"
          alt="Avatar banner text"
          width={440}
          height={240}
          className="mb-10 ml-25"
          priority
        />

          {/* Button */}

          
          <Link
  href={{
    pathname: "/singles",
    query: {
      sets: ["TLA", "TLE"],
    },
  }}
>
  <Button variant="banner" className="ml-54">
    Придбати зараз
  </Button>
</Link>


          </div>

      {/* RIGHT SIDE — image with diagonal cut */}
      <div
        className="
        relative
        h-[556px]
        overflow-hidden
        "
        style={{
          
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
        }}
        >
        <Image
          src="/images/banners/avatar_1600x1080.webp"
          alt="Avatar artwork"
          width={1000}
          height={556}
          className="object-cover object-center"
          // className="object-cover "
          priority
          />
      </div>
          </div>
    </section>
  );
};

export default BannerAvatar;



