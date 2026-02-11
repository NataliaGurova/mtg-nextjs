
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Container from "@/components/Container/Container";
import Image from "next/image";

// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";
// import { redirect } from "next/navigation";



export const metadata = {
  title: "Register | Citadel",
};

const RegisterPage = () => {

  // const session = await getServerSession(authConfig);

  // if (session) {
  //   redirect("/account");
  // }


  return (
    // <main className="min-h-screen flex items-center justify-center">
    // <Container>
    <Container className=" flex-1 flex items-center justify-center">
  <div className="flex flex-col md:flex-row items-stretch justify-between gap-20 mx-25">

    {/* Форма */}
    <div className="flex-1">
      <RegisterForm />
    </div>

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
