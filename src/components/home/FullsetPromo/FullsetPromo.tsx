// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Проверьте путь к вашим кнопкам
// import SetIcon from "@/components/SetIcon/SetIcon"; // Ваш обновленный SetIcon

// const FullsetPromo = () => {
//   return (
//     <section className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0a1503] to-[#1d5105] my-12 border border-[#2a6b0a] shadow-2xl">
//       {/* Декоративный фоновый паттерн (опционально) */}
//       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-14 gap-10">
        
//         {/* === ЛЕВАЯ ЧАСТЬ: ТЕКСТ И КНОПКА === */}
//         <div className="flex-1 space-y-6 text-[#F4F2EB]">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-black/40 border border-white/10 text-xs font-bold uppercase tracking-widest">
//             <Sparkles size={16} className="text-amber-400" />
//             <span>Ексклюзивна пропозиція</span>
//           </div>
          
//           <h2 className="text-4xl md:text-5xl font-bold leading-tight">
//             Збери їх усі. <br />
//             <span className="text-amber-400">MTG Fullsets</span>
//           </h2>
          
//           <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
//             Отримайте повні набори улюблених видань у фірмових колекційних скринях. 
//             Базові карти, рідкісні, міфіки та спеціальні фольговані версії — все в одному місці.
//           </p>
          
//           <div className="pt-4">
//             <Button variant="banner" size="default" className="text-base px-8 py-6" asChild>
//               <Link href="/fullsets">
//                 Переглянути набори
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* === ПРАВАЯ ЧАСТЬ: СУНДУК И ДИНАМИЧЕСКАЯ ТАБЛИЧКА === */}
//         <div className="flex-1 relative flex justify-center items-center w-full max-w-[450px]">
//           {/* Эффект магического свечения позади сундука */}
//           <div className="absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full scale-125"></div>
          
//           <div className="relative w-full aspect-[4/3]">
//             {/* 1. Изображение сундука (вид фас, которое вы сгенерировали) */}
//             <Image 
//               src="/chest-placeholder.png" /* 👈 Укажите путь к сохраненной картинке сундука */
//               alt="MTG Fullset Chest"
//               fill
//               className="object-contain drop-shadow-2xl"
//               priority
//             />
            
//             {/* 2. Динамическая табличка поверх сундука */}
//             {/* Подгоняйте bottom и left под геометрию вашего сундука */}
//             <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[75%] bg-gradient-to-b from-[#e8e4d9] to-[#d1cbb8] border-2 border-[#3d2e1f] rounded-sm px-3 py-2 flex items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-300 cursor-default">
              
//               {/* Иконка сета (используем ваш компонент с applyThemeColor=true) */}
//               <div className="bg-[#b3a995] bg-opacity-30 p-1.5 rounded-[4px] border border-[#3d2e1f]/20 shadow-inner">
//                 <SetIcon 
//                   setCode="sld" 
//                   setName="Secret Lair Drop"  
//                   size={28} 
//                 />
//               </div>
              
//               {/* Текст на табличке */}
//               <div className="flex flex-col justify-center">
//                 <span className="text-[15px] md:text-base font-bold text-[#2d2216] leading-none font-serif tracking-tight">
//                   Secret Lair Drop
//                 </span>
//                 <span className="text-[9px] md:text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] mt-1 opacity-90">
//                   Premium Foil Set
//                 </span>
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default FullsetPromo;

"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import css from "./FullsetPromo.module.css";

const FullsetPromo = () => {
  return (
    <section className={css.promoSection}>
      {/* Декоративный фоновый паттерн */}
      <div className={css.chestContainer}>
        <Image
          src="/sets/chest-promo.png" /* 👈 Укажите путь к вашему фоновому паттерну */
          alt="Background Pattern"
          // layout="fill"
          width={900}
          height={600}
          className={css.chestImage}
          // priority
        />
      </div>

      <div className={css.contentWrapper}>
        
          <div className={css.badge}>
            <Sparkles size={16} className={css.highlight} />
            <span>Ексклюзивна пропозиція</span>
          </div>

          <div>
          <h2 className={css.title}>
            {/* Збери їх усі <br /> */}
            Збери їх усі 
            <span className={css.highlight}> MTG Fullsets</span>
          </h2>
          

            <Button variant="banner" size="default" className={css.actionButton} asChild>
              <Link href="/fullsets">
                Переглянути набори
              </Link>
            </Button>
            </div>
          <div className={css.actionWrap}>
            {/* Используем вашу кнопку с вариантом "banner" */}
          </div>

      </div>
    </section>
  );
};

export default FullsetPromo;