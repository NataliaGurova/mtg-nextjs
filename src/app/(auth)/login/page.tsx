
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Container from "@/components/Container/Container";

import Image from "next/image";
import { authConfig } from "@/auth";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

const LoginPage = async () => {

  const session = await getServerSession(authConfig);

  // 🔐 если уже залогинен — в аккаунт
  if (session) {
    redirect("/account");
  }

  return (
  
    // <Container>
    <Container className=" flex-1 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-20 mx-25">

        {/* Form */}
        <div className="flex-1">
          <LoginForm />
        </div>

        {/* Image */}
        <div className="hidden md:block w-[800px] overflow-hidden rounded-[4px]">
          <Image
            src="/images/login.jpg"
            alt="Magic"
            width={800}
            height={230}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
      </Container>
  
  );
}

export default LoginPage;
