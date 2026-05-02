// src/app/(protected)/account/layout.tsx
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";
// import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
// import Container from "@/components/Container/Container";
// import AccountNavigation from "@/components/account/AccountNavigation/AccountNavigation";
// // import AccountNavigation from "@/components/account/AccountNavigation"; // Вынесем меню отдельно

// export default async function AccountLayout({ children }: { children: React.ReactNode }) {
//   const session = await getServerSession(authConfig);

//   if (!session) {
//     redirect("/login");
//   }

//   return (
//     <>
//       <FixedBackgroundHome />
//       <main className="relative z-10 min-h-screen bg-[#eff2f8]/50">
//         <Container className="py-10">
//           <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
//             {/* Клиентский компонент с шапкой и кнопками переключения */}
//             <AccountNavigation user={session.user} />
            
//             {/* Сюда будут подставляться страницы (Profile, Wishlist и т.д.) */}
//             <div className="mt-8">
//               {children}
//             </div>
//           </div>
//         </Container>
//       </main>
//     </>
//   );
// }


// src/app/(protected)/account/layout.tsx

import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
import Container from "@/components/Container/Container";
import AccountNavigation from "@/components/account/AccountNavigation/AccountNavigation";


export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // Получаем сессию только ради данных пользователя (имя, email)
  const session = await getServerSession(authConfig);

  return (
    <>
      <FixedBackgroundHome />
      <main className="relative z-10 min-h-screen bg-[#eff2f8]/50">
        <Container className="py-10">
          {/* <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8"> */}
          {/* <div> */}
            
            {/* Передаем данные пользователя в шапку с меню */}
            {/* Мы уверены, что session существует, благодаря (protected)/layout.tsx */}
            <AccountNavigation user={session!.user} />
            
            <div className="mt-8">
              {children}
            </div>
            
          {/* </div> */}
        </Container>
      </main>
    </>
  );
}