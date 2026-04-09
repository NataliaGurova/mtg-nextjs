// src/components/cart/CartSync.tsx

"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";

export default function CartSync() {
  const { status } = useSession();
  const fetchFromServer = useCartStore((state) => state.fetchFromServer);

  useEffect(() => {
    if (status === "authenticated") {
      // 1. Как только юзер вошел в аккаунт -> тянем его корзину из Базы Данных
      fetchFromServer();
    } else if (status === "unauthenticated") {
      // 2. Как только юзер разлогинился -> мгновенно очищаем Zustand и LocalStorage, 
      // чтобы он не видел чужие карты
      // (Передаем true или какой-то флаг, чтобы не отправлять пустую корзину на сервер при логауте, 
      // но пока можно использовать обычный clearCart, если он не вызывает syncWithServer сразу же)
      
      // ВАЖНО: В cartStore.ts в функции clearCart уберите вызов get().syncWithServer(), 
      // иначе при логауте корзина в базе затрется пустотой!
      useCartStore.setState({ items: [], expireAt: null }); 
    }
  }, [status, fetchFromServer]);

  // Этот компонент ничего не рисует на экране, он работает в фоне
  return null; 
}