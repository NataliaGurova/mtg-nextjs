
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";
// import LoginForm from "@/components/auth/LoginForm/LoginForm";

// import Container from "@/components/Container/Container";
// import Image from "next/image";

// export const metadata = {
//   title: "Login | Citadel",
//   description: "Sign in to your account",
// };

// const LoginPage = async () => {

//   const session = await getServerSession(authConfig);

//   // 🔐 если уже залогинен — в аккаунт
//   if (session) {
//     redirect("/account");
//   }

//   return (

//     <Container className=" flex-1 flex items-center justify-center py-10">
//       <div className="flex flex-col md:flex-row items-stretch justify-between gap-20 mx-25">

//         {/* Form */}
//         <div className="flex-1">
//           <LoginForm />
//         </div>

//         {/* Image */}
//         <div className="hidden md:block w-[800px] overflow-hidden rounded-[4px]">
//           <Image
//             src="/images/login.jpg"
//             alt="Magic"
//             width={800}
//             height={400}
//             className="w-full h-full object-cover"
//           />
//         </div>

//       </div>
//       </Container>
  
//   );
// }

// export default LoginPage;

// //  картинка норм --------------------------------

// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";
// import LoginForm from "@/components/auth/LoginForm/LoginForm";
// import Container from "@/components/Container/Container";
// import Image from "next/image";

// export const metadata = {
//   title: "Login | Citadel",
//   description: "Sign in to your account",
// };

// const LoginPage = async () => {
//   const session = await getServerSession(authConfig);

//   // 🔐 если уже залогинен — в аккаунт
//   if (session) {
//     redirect("/account");
//   }

//   return (
//     <Container className="flex-1 flex items-center justify-center py-10">
      
//       {/* md:flex-row -> на планшете ставим в ряд (50/50).
//         gap-10 -> отступ между формой и картинкой на планшете.
//         lg:gap-20 -> увеличенный отступ на десктопе.
//       */}
//       <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between w-full max-w-[1300px] gap-10 lg:gap-20 mx-auto">

//         {/* Форма */}
//         {/* w-full -> на мобилке 100%.
//           md:w-1/2 -> на планшете 50%.
//           lg:flex-1 -> на десктопе занимает всё оставшееся место от картинки.
//         */}
//         <div className="w-full md:w-1/2 lg:flex-1 flex justify-center lg:justify-start">
//           <LoginForm />
//         </div>

//         {/* Картинка */}
//         {/* hidden md:block -> скрываем на мобилке, показываем от планшета и выше.
//           md:w-1/2 -> на планшете картинка занимает ровно половину (50%) ширины.
//           lg:w-[800px] lg:shrink-0 -> на десктопе возвращаем ваши жесткие 800px.
//         */}
//         <div className="hidden md:block md:w-1/2 lg:w-[800px] lg:shrink-0 overflow-hidden rounded-[4px]">
//           <Image
//             src="/images/login.jpg"
//             alt="Magic"
//             width={800}
//             height={400}
//             priority
//             /* object-cover — это та самая магия!
//                На планшете контейнер сузится, а картинка не сплющится,
//                она просто изящно обрежет свои левый и правый края, сфокусировавшись по центру.
//             */
//             className="w-full h-full object-cover object-center"
//           />
//         </div>

//       </div>
//     </Container>
//   );
// }

// export default LoginPage;


// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";
// import LoginForm from "@/components/auth/LoginForm/LoginForm";
// import Container from "@/components/Container/Container";
// import Image from "next/image";

// export const metadata = {
//   title: "Login | Citadel",
//   description: "Sign in to your account",
// };

// const LoginPage = async () => {
//   const session = await getServerSession(authConfig);

//   if (session) {
//     redirect("/account");
//   }

//   return (
//     <Container className="flex-1 flex items-center justify-center py-10">
      
//       {/* ГИБКОЕ РАССТОЯНИЕ:
//         gap-8 на мобилке, gap-12 на планшете, gap-20 на огромных экранах
//       */}
//       <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between w-full max-w-[1300px] gap-8 md:gap-12 lg:gap-20 mx-auto">

//         {/* ФОРМА: Занимает 100% на мобилке и примерно 40% на десктопе */}
//         <div className="w-full md:w-[40%] flex justify-center md:justify-start">
//           <LoginForm />
//         </div>

//         {/* КАРТИНКА: Занимает 60% ширины, но не больше 800px.
//           Контейнер ОБЯЗАТЕЛЬНО должен иметь класс 'relative' и высоту (h-[400px]),
//           чтобы Next.js Image с параметром 'fill' понимал, какие у него границы.
//         */}
//         <div className="hidden md:block w-full md:w-[60%] lg:max-w-[800px] relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
//           <Image
//             src="/images/login.jpg"
//             alt="Magic"
//             fill /* <-- Главный секрет адаптивности. Никаких width/height */
//             priority
//             className="object-cover object-center"
//           />
//         </div>

//       </div>
//     </Container>
//   );
// }

// export default LoginPage;

import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import Container from "@/components/Container/Container";
import Image from "next/image";

export const metadata = {
  title: "Login | Citadel",
  description: "Sign in to your account",
};

const LoginPage = async () => {
  const session = await getServerSession(authConfig);
  if (session) redirect("/account");

  return (
    <Container className="flex-1 flex items-center justify-center py-10">
      {/* <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 lg:gap-20 w-full max-w-5xl"> */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 lg:gap-20 w-full max-w-[1300px] mx-auto">

        {/* Form */}
        {/* <div className="flex justify-center md:justify-start md:items-center w-full md:w-auto"> */}
        {/* <div className="w-full md:w-1/2 lg:flex-1 flex justify-center lg:justify-start"> */}
          <LoginForm />
        {/* </div> */}

        {/* Image — только md+ */}
        <div className="hidden md:block flex-1 min-h-[400px] overflow-hidden rounded-[4px] lg:max-h-[400px] max-w-[800px]">
          <Image
            src="/images/login.jpg"
            alt="Magic"
            width={800}
            height={600}
            className="object-cover object-center w-full h-full"
          />
        </div>

      </div>
    </Container>
  );
};

export default LoginPage;