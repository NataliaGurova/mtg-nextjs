import SetItem from "../SetItem/SetItem";
import css from "./SetList.module.css"

// Если у вас настроены алиасы путей (Path Aliases) в Next.js:
import setsData from "@/lib/constants/setsData.json";
// Если алиасов нет, используйте относительный путь, например:
// import setsData from "../../../lib/constants/setsData.json";

const SetList = () => {
  return (
    <section className={css.wrapper}>
      {setsData.map((item, index) => (
        <SetItem
          key={index} // Уникальный ключ для React
          setCode={item.set}
          setName={item.set_name}
          isFoil={item.isFoil}
          price={item.prices}
        />
      ))}
    </section>
  );
};

export default SetList;