"use client";

import { useState, useEffect } from "react";
import { X, Clock, CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CART_RESERVATION_MS } from "@/lib/constants/constants";
import css from "./ReservationInfoModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationInfoModal = ({ isOpen, onClose }: Props) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Переводим миллисекунды в минуты для текста
  const reservationMinutes = Math.floor(CART_RESERVATION_MS / 60000);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (dontShowAgain) {
      // Сохраняем в браузере, что пользователь больше не хочет видеть это окно
      localStorage.setItem("hideReservationInfo", "true");
    }
    onClose();
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <div className={css.content}>
          <div className={css.header}>
            <Clock size={28} />
            <h3 className={css.title}>Важливо</h3>
          </div>
          
          <p className={css.description}>
            Після додавання карти до кошика вона резервується за вами на 
            <span className={css.highlight}> {reservationMinutes} хвилин. </span> 
            {/* щоб ви могли спокійно завершити оформлення замовлення.   */}
            Після закінчення цього часу резерв автоматично скасовується.
            {/* і карта знову стає доступною для покупки. */}
          </p>

          {/* <div className={css.checkboxWrapper} onClick={() => setDontShowAgain(!dontShowAgain)}>
            <input 
              type="checkbox" 
              id="dontShow" 
              checked={dontShowAgain}
              onChange={() => {}} // Обробляється через onClick обгортки
              className={css.checkbox}
            />
            <label htmlFor="dontShow" className={css.label}>
              Не показувати це повідомлення знову
            </label>
          </div> */}
          

          {/* <label className={css.checkboxWrapper}> */}
          <label className={css.label}>
  {/* Схований системний чекбокс, який керує станом */}
  <input 
    type="checkbox" 
    checked={dontShowAgain}
    onChange={() => setDontShowAgain(!dontShowAgain)}
    className={css.input}
  />
  
  {/* Ваш кастомний квадрат з галочкою */}
  <span className={css.box} aria-hidden="true">
    <svg
      className={css.check}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>

  {/* Текст */}
  <span className={css.text}>
    Не показувати це повідомлення знову
  </span>
</label>

          <Button variant="more" onClick={handleConfirm} className={css.submitBtn}>
          {/* Add to Cart */}
            Додати до кошика
          <ShoppingBag className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};