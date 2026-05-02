
// const ProfilePage = () => {
//   return (
//     <div>
//       Profile
//     </div>
//   )
// }

// export default ProfilePage;


// src/app/(protected)/account/profile/page.tsx
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import Profile from "@/components/account/Profile/Profile";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);
  
  // Добавляем проверку для TypeScript. 
  // В реальности это никогда не сработает, так как layout не пустит сюда без сессии.
  if (!session?.user) {
    return null;
  }

  // Теперь TypeScript на 100% уверен, что session.user существует
  return <Profile user={session.user} />;
}