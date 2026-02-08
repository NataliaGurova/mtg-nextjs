
// import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";



export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  console.log("SESSION:", session);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {children}
    </>
  );
}
