// import SetItem from "../SetItem/SetItem";
// import css from "./SetList.module.css"

// // Если у вас настроены алиасы путей (Path Aliases) в Next.js:
// import setsData from "@/lib/constants/setsData.json";
// // Если алиасов нет, используйте относительный путь, например:
// // import setsData from "../../../lib/constants/setsData.json";

// const SetList = () => {
//   return (
//     <section className={css.wrapper}>
//       {setsData.map((item, index) => (
//         <SetItem
//           key={index} // Уникальный ключ для React
//           setCode={item.set}
//           setName={item.set_name}
//           isFoil={item.isFoil}
//           price={item.prices}
//         />
//       ))}
//     </section>
//   );
// };

// export default SetList;

import Link from "next/link";
import SetItem from "../SetItem/SetItem";
import css from "./SetList.module.css";
import setsData from "@/lib/constants/setsData.json";

const SetList = () => {
  return (
    <section className={css.wrapper}>
      {setsData.map((item, index) => (
        <Link key={index} href={`/fullsets/${item.set}`}>
          <SetItem
            setCode={item.set}
            setName={item.set_name}
            isFoil={item.isFoil}
            price={item.prices}
          />
        </Link>
      ))}
    </section>
  );
};

export default SetList;