
import Image from "next/image";
import Link from "next/link";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/" className={css.link} title="Go to homepage">
      <Image
        src="/citadelTower3.svg"
        alt="Citadel icon"
        width={60}
        height={60}
        className={css.iconImage}
        priority
      />

      {/* Только на md+ */}
      <Image
        src="/citadelName-en2.svg"
        alt="Citadel text"
        width={150}
        height={50}
        // className="hidden md:block"
        className="hidden lg:block"
        priority
      />
    </Link>
  );
};

export default Logo;

