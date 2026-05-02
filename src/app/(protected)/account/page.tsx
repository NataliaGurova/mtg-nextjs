
  
//   "use client";
  
//   import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
// import Loader from "@/components/Loader/Loader";
//   import { signOut, useSession } from "next-auth/react";


// const AccountPage = () => {
//   const { data: session, status } = useSession();

//   // const firstName = session?.user?.name?.split(" ")[0];
//   const firstName = session?.user?.firstName || session?.user?.name?.split(" ")[0] || session?.user?.email;

//   // if (status === "loading") {
//   //   return <p className="p-6">Loading...</p>;
//   // }

//   if (status === "loading") {
//     return (
//       <div className="p-6 flex justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return null; // на всякий случай, но редирект уже есть в layout
//   }

//   return (
//     <>
//       <FixedBackgroundHome />

//       <main className="relative z-10 bg-[#eff2f8]/70">
      
//         {/* Header */}
//         <div className="flex items-center justify-between p-10">
//           <h1 className="text-3xl font-semibold">
//             Welcome, {firstName || session.user.email}
//           </h1>

//           <button
//             onClick={() => signOut({ callbackUrl: "/login" })}
//             className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
//           >
//             Sign out
//           </button>
//         </div>

//         {/* Content */}
//         <section className="h-96">
//           <p className="text-gray-700">
//             Here will be your account info, orders, settings, etc.
//           </p>
//         </section>
//       </main>
//     </>
//   );
// };

// export default AccountPage;

// // src/app/(protected)/account/page.tsx
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";
// import AccountClient from "@/components/account/AccountClient/AccountClient";
// import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
// import Container from "@/components/Container/Container";
// // import AccountClient from "@/components/account/AccountClient";

// export default async function AccountPage() {
//   const session = await getServerSession(authConfig);

//   // Если зашел неавторизованный — кидаем на логин
//   if (!session) {
//     redirect("/login");
//   }

//   return (
//     <>
//       <FixedBackgroundHome />
//       <main className="relative z-10 min-h-screen bg-[#eff2f8]/50">
//         <Container className="py-10">
//           {redirect("/account/profile")}
//         {/* <AccountClient user={session.user} /> */}
//         </Container>
//         </main>
//     </>
//   );
// }


// src/app/(protected)/account/page.tsx
import { redirect } from "next/navigation";

export default function AccountPage() {
  // Просто перенаправляем пользователя на первую вкладку
  redirect("/account/profile");
}

