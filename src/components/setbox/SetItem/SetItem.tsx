

// import Image from "next/image";
// import SetIcon from "@/components/SetIcon/SetIcon";
// import css from "./SetItem.module.css"

// const SetItem = () => {
//   return (
//     <div className={css.wrapper}>
      
//       {/* --- ВЕРХНЯЯ ЧАСТЬ: Сундук с табличкой --- */}
//       <div className={css.chestContainer}>
        
//         {/* Картинка сундука */}
//         <Image
//           src="/mtg/Chest_tr.png"
//           alt="Avatar artwork desktop"
//           width={320}
//           height={200}
//           priority
//         />
        
//         {/* Иконка на табличке */}
//         <div className={css.iconWrapper}>
//           <SetIcon setCode="tle" theme="bronze" size={36} />
//         </div>
          
//         {/* Текст на табличке */}
//         <div className={css.textWrapper}>
//           <p className={css.setText}>
//             TLE
//           </p>
//         </div>
//       </div>

//       {/* --- НИЖНЯЯ ЧАСТЬ: Название и Цена --- */}
//       <div className={css.infoContainer}>
        
//         <h2 className={css.title}>
//           Bloomburrow
//           <div className={css.foil}>foil</div>
//         </h2>
        
//         <p className={css.price}>
//           45 000 ₴
//         </p>
        
//       </div>
      
//     </div>
//   );
// };

// export default SetItem;


import Image from "next/image";
import css from "./SetItem.module.css";
import SetIcon from "@/components/SetIcon/SetIcon";

// Описываем, какие данные принимает карточка
interface SetItemProps {
  setCode: string;
  setName: string;
  isFoil: boolean;
  price: number;
}

const SetItem = ({ setCode, setName, isFoil, price }: SetItemProps) => {
  // Форматируем цену (добавит пробелы: 45000 -> 45 000)
  const formattedPrice = price.toLocaleString("uk-UA");

  return (
    <div className={css.wrapper}>
      
      {/* --- ВЕРХНЯЯ ЧАСТЬ: Сундук с табличкой --- */}
      <div className={css.chestContainer}>
        {/* <Image
          src="/mtg/Chest_foil.png"
          alt={`${setName} chest`}
          width={320}
          height={200}
          priority
        /> */}
        {isFoil ? (
            <Image
          src="/mtg/Chest_foil1.png"
          alt={`${setName} chest`}
          width={320}
          height={200}
          priority
        />):
          (
            <Image
          src="/mtg/Chest_nonfoil1.png"
          alt={`${setName} chest`}
          width={320}
          height={200}
          priority
        />
          )}
        
        {/* Иконка */}
        <div className={css.iconWrapper}>
          {/* Передаем код сета в иконку */}
          <SetIcon setCode={setCode} theme="bronze" size={36} />
        </div>
          
        {/* Текст на табличке */}
        <div className={css.textWrapper}>
          {/* Делаем код сета заглавными буквами */}
          <p className={css.setText}>
            {setCode.toUpperCase()}
          </p>
        </div>
      </div>

      {/* --- НИЖНЯЯ ЧАСТЬ: Название и Цена --- */}
      <div className={css.infoContainer}>
        <h2 className={css.title}>
          {setName}
          {/* Показываем значок Foil только если isFoil === true */}
        </h2>
        <div className={css.foilPrice}>
          {isFoil && (
            <span className={css.foil}>
              Foil
            </span>
          )}
        <p className={css.price}>
          {formattedPrice} ₴
        </p>
        </div>
      </div>
      
    </div>
  );
};

export default SetItem;