import Link from "next/link";
import { Button } from "../ui/button";
// import Image from "next/image";

const FinalCTA = () => {
  return (
    <section className="px-6 py-6 text-center">
      <h2 className="text-2xl font-semibold mb-6">
      Знайдіти свою карту Magic: The Gathering
      </h2>
      {/* <p className="text-lg text-gray-500">
        Знайдіть свою улюблену карту Magic: The Gathering серед тисячі варіантів.
      </p> */}
              {/* <Image
                src="/images/tower2.jpg"
                alt="Avatar banner text"
                width={800}
                height={600}
                className="mb-10 ml-25"
                priority
              /> */}
      

      <Link
  href={{
    pathname: "/singles",
    // query: {
    //   sets: [
    //     "TLA",
    //     "TLE",
    //   ],
    // },
  }}
>
      <Button variant="banner">
      Відкрити MTG Singles
        </Button>
        </Link>

    </section>
  );
};

export default FinalCTA;
