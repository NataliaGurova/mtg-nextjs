import Image from "next/image";

const FixedBackgroundHome = () => {
  return (
    <div
      className="
        fixed
        inset-0
        -z-10
        pointer-events-none
      "
    >
      <Image
        src="/images/towerDark2.png"
        alt="Citadel background"
        width={1600}
        height={1000}
        // fill
        priority
        className="object-cover object-top"
      />
    </div>
  );
};

export default FixedBackgroundHome;
