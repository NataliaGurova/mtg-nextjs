
// const AccountPage = () => {
  //   return <main>
  //     <FixedBackgroundHome />
  //     <h1>Welcome back, {users.name}</h1>
  //   </main>;
  // };
  
  // export default AccountPage;
  
  "use client";
  
  import FixedBackgroundHome from "@/components/home/FixedBackgroundHome";
  import { signOut, useSession } from "next-auth/react";


const AccountPage = () => {
  const { data: session, status } = useSession();

  // const firstName = session?.user?.name?.split(" ")[0];
  const firstName = session?.user?.firstName || session?.user?.name?.split(" ")[0] || session?.user?.email;

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  if (!session?.user) {
    return null; // на всякий случай, но редирект уже есть в layout
  }

  return (
    <>
      <FixedBackgroundHome />

      <main className="relative z-10 bg-[#eff2f8]/70">
      
        {/* Header */}
        <div className="flex items-center justify-between p-10">
          <h1 className="text-3xl font-semibold">
            Welcome, {firstName || session.user.email}
          </h1>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            Sign out
          </button>
        </div>

        {/* Content */}
        <section className="h-96">
          <p className="text-gray-700">
            Here will be your account info, orders, settings, etc.
          </p>
        </section>
      </main>
    </>
  );
};

export default AccountPage;

