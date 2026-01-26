import Link from "next/link";
import { Button } from "../ui/button";


const FinalCTA = () => {
  return (
    <section className=" py-25 text-center">
      <h2 className="text-2xl font-semibold mb-6">
      Знайдіть свою карту Magic: The Gathering
      </h2>

      <Link
        href={{
          pathname: "/singles",
    // query: {
    //   sets: [
    //     "TLA",
    //     "TLE",
    //   ],
    // },
        }}>
        <Button variant="banner">
          Відкрити MTG Singles
        </Button>
      </Link>

    </section>
  );
};

export default FinalCTA;
