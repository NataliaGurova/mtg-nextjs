// app/actions/cart.ts
"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authConfig } from "@/auth"; 
import { connectDB } from "@/db/db";
import Card from "@/db/models/Card";
import { CART_RESERVATION_MS } from "@/lib/constants/constants";

import { revalidatePath } from "next/cache"; 


interface IReservation {
  userId: string;
  qty: number;
  expiresAt: Date;
}

// // Время резерва (например, 1 час)
// const RESERVATION_HOURS = 1;

/**
 * Экшен для добавления/увеличения резерва карты
 */
export async function reserveCard(cardId: string, quantityToAdd: number = 1) {
  await connectDB();

  // 1. Проверяем, залогинен ли пользователь
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return { success: false, error: "Пожалуйста, войдите в систему" };
  }
  
  // В качестве идентификатора используем email (или session.user.id, если он у вас настроен)
  const userId = session.user.email; 

  // 2. Инициализируем сессию базы данных для транзакции
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    // 3. Получаем карту с привязкой к текущей транзакции
    const card = await Card.findById(cardId).session(dbSession);
    
    if (!card) {
      throw new Error("Карта не найдена");
    }

    const now = new Date();
    const expirationDate = new Date(now.getTime() + CART_RESERVATION_MS);
    // const expirationDate = new Date(now.getTime() + RESERVATION_HOURS * 60 * 60 * 1000);

    // 4. "Ленивая очистка": удаляем все просроченные резервы (от любых пользователей)
    card.reservations = card.reservations.filter(
      (res: IReservation) => res.expiresAt > now
    );

    // 5. Высчитываем, сколько карт сейчас реально занято
    const currentReservedQty = card.reservations.reduce(
      (sum: number, res: IReservation) => sum + res.qty, 
      0
    );

    // 6. Проверяем, хватает ли свободного количества
    const availableQty = card.quantity - currentReservedQty;
    if (availableQty < quantityToAdd) {
      throw new Error(`Недостаточно карт. Доступно для заказа: ${availableQty}`);
    }

    // 7. Ищем, есть ли уже активный резерв у ЭТОГО пользователя на ЭТУ карту
    const existingResIndex = card.reservations.findIndex(
      (res: IReservation) => res.userId === userId
    );

    if (existingResIndex > -1) {
      // Если карта уже в корзине — увеличиваем количество и обновляем таймер
      card.reservations[existingResIndex].qty += quantityToAdd;
      card.reservations[existingResIndex].expiresAt = expirationDate;
    } else {
      // Если карты нет — создаем новую запись о резерве
      card.reservations.push({
        userId,
        qty: quantityToAdd,
        expiresAt: expirationDate,
      });
    }

    // Явно указываем Mongoose, что мы изменили массив (иногда нужно для вложенных схем без _id)
    card.markModified('reservations');

    // 8. Сохраняем изменения и коммитим транзакцию
    await card.save({ session: dbSession });
    await dbSession.commitTransaction();

    // 🔹 КАК ТОЛЬКО ТРАНЗАКЦИЯ УСПЕШНА, СБРАСЫВАЕМ КЭШ СТРАНИЦ
    // Укажите пути, где у вас выводятся карты. Например:
    revalidatePath("/singles"); // Страница каталога
    revalidatePath("/"); // Главная страница (если там есть новинки)
    revalidatePath(`/singles/${card.scryfall_id}`); // Страница самой карты
    
    return { success: true };
    
  } catch (error: unknown) {
    // Если что-то пошло не так, ОТКАТЫВАЕМ все изменения
    await dbSession.abortTransaction();
  // Безопасно достаем текст ошибки
    const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
    return { success: false, error: errorMessage };
  } finally {
    // Обязательно закрываем сессию БД
    dbSession.endSession();
  }
}

/**
 * Экшен для полного удаления резерва (когда юзер нажимает крестик в корзине)
 */
export async function removeReservation(cardId: string) {
  await connectDB();

  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return { success: false, error: "Не авторизован" };
  }
  
  const userId = session.user.email; 

  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const card = await Card.findById(cardId).session(dbSession);
    
    if (!card) {
      throw new Error("Карта не найдена");
    }

    // Оставляем в массиве только те резервы, которые НЕ принадлежат текущему пользователю
    card.reservations = card.reservations.filter(
      (res: IReservation) => res.userId !== userId
    );

    card.markModified('reservations');

    await card.save({ session: dbSession });
    await dbSession.commitTransaction();

    // 🔹 СБРАСЫВАЕМ КЭШ ПРИ УДАЛЕНИИ (чтобы карты вернулись на витрину)
    revalidatePath("/singles");
    revalidatePath("/");
    
    return { success: true };
    
  } catch (error: unknown) {
    await dbSession.abortTransaction();

    // Безопасно достаем текст ошибки
    const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
    return { success: false, error: errorMessage };
  } finally {
    dbSession.endSession();
  }
}