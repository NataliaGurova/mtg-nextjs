
import { authConfig } from "@/auth";
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Container from "@/components/Container/Container";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";

export const metadata = {
  title: "Register | Citadel",
  description: "Create a new account",
};


const RegisterPage = async () => {

  // const session = await getServerSession(authConfig);

  // if (session) {
  //   redirect("/account");
  // }

  // 1. Проверяем, авторизован ли пользователь
  const session = await getServerSession(authConfig);

  // 2. Если да — отправляем в аккаунт
  if (session) {
    redirect("/account");
  }


  return (

    <Container className=" flex-1 flex items-center justify-center py-10">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 lg:gap-20 w-full max-w-[1300px] mx-auto">

    {/* Форма */}
    {/* <div className="flex-1"> */}
      <RegisterForm />
    {/* </div> */}

    {/* Картинка */}
    <div className="hidden md:block w-[800px] overflow-hidden rounded-[4px]">
      <Image
        src="/images/register.jpg"
        alt="Magic"
        width={1100}
        height={560} // базовое соотношение, не критично
        className="h-full w-full items-start object-cover"
      />
    </div>

  </div>
</Container>    
    // </main>
  );
};

export default RegisterPage;
