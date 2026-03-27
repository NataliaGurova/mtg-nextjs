// lib/constants/constants.ts

// 🔹 Главная настройка: Время резерва корзины в минутах. 
// Меняйте только эту цифру! (Например: 30 мин, 60 мин, 300 = 5 часов)
export const CART_RESERVATION_MINUTES = 60; 

// Вычисляем миллисекунды для использования в коде
export const CART_RESERVATION_MS = CART_RESERVATION_MINUTES * 60 * 1000;