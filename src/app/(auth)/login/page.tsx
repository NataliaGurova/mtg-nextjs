
// import Container from "@/components/Container/Container";


// const LoginPage = () => {
//   return (
//     <Container>
//       <h1>Login</h1>
//     </Container>
    
//   )
// }

// export default LoginPage;

// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const form = e.currentTarget;

//     const res = await signIn("credentials", {
//       email: form.email.value,
//       password: form.password.value,
//       redirect: false,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else {
//       router.push("/profile");
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" placeholder="Email" required />
//       <input name="password" type="password" placeholder="Password" required />
//       <button type="submit">Login</button>

//       {error && <p>{error}</p>}
//     </form>
//   );
// }

// "use client";

// import { signIn } from "next-auth/react";

// export default function LoginPage() {
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const form = new FormData(e.currentTarget as HTMLFormElement);

//     await signIn("credentials", {
//       email: form.get("email"),
//       password: form.get("password"),
//       callbackUrl: "/account",
//     });
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input name="email" type="email" />
//       <input name="password" type="password" />
//       <button>Login</button>
//     </form>
//   );
// }


// "use client";

// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (res?.error) {
//       setError("Неверный email или пароль");
//       return;
//     }

//     router.push("/account");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Login</h1>
//       {/* <GoogleButton /> */}
//       <div>or</div>

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <button type="submit">Login</button>
//     </form>
//   );
// }


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
  
    <Container className=" flex-1 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 mx-25">

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
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
      </Container>
  
  );
}

export default LoginPage;
