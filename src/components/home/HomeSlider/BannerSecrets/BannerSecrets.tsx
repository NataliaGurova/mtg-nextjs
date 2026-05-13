// import Image from "next/image";
// import { Button } from "../../../ui/button";
// import Link from "next/link";
// import css from "./BannerSecrets.module.css";

// const BannerSecrets = () => {
//   return (
//     <section className={css.section}>

//       {/* Центральный контейнер */}
//       <div className={css.container}>

//         {/* LEFT SIDE — Text and Button */}
//         <div className={css.textContent}>
//           <Image
//             src="/images/banners/secrets-text.png"
//             alt="Avatar banner text"
//             // width={440}
//             // height={240}
//             width={660}
//             height={303}
//             className={css.textImage}
//             priority
//           />

//           <Link
//             href={{
//               pathname: "/singles",
//               query: { sets: ["sos"] },
//             }}
//           >
//             <Button variant="outline" className={css.actionButton}>
//               {/* Придбати зараз */}
//               Вже доступно
//             </Button>
//           </Link>
//         </div>

//         {/* RIGHT SIDE — image with diagonal cut */}
//         <div className={css.imageAvatar}>
//           {/* 📱 Картинка для мобилок (до 768px) */}
//           <Image
//             src="/images/banners/secrets_767x60.webp"
//             alt="Avatar artwork mobile"
//             width={575}
//             height={700}
//             className={`${css.artwork} ${css.mobileArt}`}
//             priority
//           />

//           {/* 💻 Картинка для планшетов и ПК (от 768px) */}
//           <Image
//             src="/images/banners/secrets_1600x1080.webp"
//             alt="Avatar artwork desktop"
//             width={1600}
//             height={1080}
//             className={`${css.artwork} ${css.desktopArt}`}
//             priority
//           />

//         </div>

//       </div>

//     </section>
//   );
// };

// export default BannerSecrets;


import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../ui/button"; // Проверьте правильность пути
import css from "./BannerSecrets.module.css";

const BannerSecrets = () => {
  return (
    <section className={css.section}>
      {/* Центральный контейнер */}
      <div className={css.container}>
        
        {/* ЛЕВАЯ ЧАСТЬ — Логотип, Текст и Кнопка */}
        <div className={css.textContent}>
          
          {/* 1. Картинка-логотип */}
          <Image
            src="/images/banners/secrets-text.png"
            alt="Avatar banner text"
            width={540}
            height={193}
            // width={660}
            // height={303}
            className={css.textImage}
            priority
          />

          {/* 2. Текст под картинкой (Стили теперь в модуле) */}
          <div className={css.textWrapper}>
            <h2 className={css.title}>Школа стала реальністю</h2>
            <p className={css.description}>
              Знайдіть своє місце серед п&apos;яти коледжів, відкладіть книги та пориньте у
              реальний світ! Розкрийте Таємниці Стріксгейвена та доведіть, що ваш коледж — найкращий, із кожним розіграним заклинанням.
            </p>
          </div>

          {/* 3. Кнопка с вашим стилем "banner" */}
          <Link
            href={{
              pathname: "/singles",
              query: { sets: ["sos"] },
            }}
          >
            <Button variant="textUppercase" className={css.actionButton}>
              Доступно зараз
            </Button>
          </Link>

        </div>

        {/* ПРАВАЯ ЧАСТЬ — Арт с диагональным срезом */}
        <div className={css.imageAvatar}>
          {/* 📱 Для мобилок (до 768px) */}
          <Image
            src="/images/banners/secrets_767x60.webp"
            alt="Avatar artwork mobile"
            width={767}
            height={577}
            className={`${css.artwork} ${css.mobileArt}`}
            priority
          />

          {/* 💻 Для планшетов и ПК (от 768px) */}
          <Image
            src="/images/banners/secrets_1600x1080.webp"
            alt="Avatar artwork desktop"
            width={1600}
            height={1080}
            className={`${css.artwork} ${css.desktopArt}`}
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default BannerSecrets;