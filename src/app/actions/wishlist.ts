// app/actions/wishlist.ts
// "use server";
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/auth";

// export async function toggleWishlistAction(cardId: string) {
//   await connectDB();
//   const session = await getServerSession(authConfig);
  
//   if (!session?.user?.email) {
//     return { success: false, error: "unauthorized" };
//   }

//   const user = await User.findOne({ email: session.user.email });
//   const index = user.wishlist.indexOf(cardId);

//   if (index === -1) {
//     // Если нет в списке - добавляем
//     user.wishlist.push(cardId);
//   } else {
//     // Если есть - удаляем
//     user.wishlist.splice(index, 1);
//   }

//   await user.save();
//   return { success: true, isWishlisted: index === -1 };
// }

"use server";

import { connectDB } from "@/db/db";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

import { Types } from "mongoose";

// 1. Функция для добавления/удаления из Wishlist
export async function toggleWishlistAction(cardId: string) {
  await connectDB();
  const session = await getServerSession(authConfig);
  
  if (!session?.user?.email) {
    return { success: false, error: "unauthorized" };
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) return { success: false, error: "user_not_found" };

  const index = user.wishlist.indexOf(cardId);

  if (index === -1) {
    user.wishlist.push(cardId); // Добавляем
  } else {
    user.wishlist.splice(index, 1); // Удаляем
  }

  await user.save();
  return { success: true, isWishlisted: index === -1 };
}

// Добавьте эту функцию в src/app/actions/wishlist.ts
export async function getWishlistIds() {
  await connectDB();
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) return [];
  
  const user = await User.findOne({ email: session.user.email });
  // Возвращаем массив строк (ID)
  return user?.wishlist.map((id: Types.ObjectId | string) => id.toString()) || [];
}



// 2. Функция для проверки статуса (горит сердечко или нет)
export async function checkWishlistStatus(cardId: string) {
  await connectDB();
  const session = await getServerSession(authConfig);
  
  if (!session?.user?.email) return false;

  const user = await User.findOne({ email: session.user.email });
  return user?.wishlist.includes(cardId) ?? false;
}