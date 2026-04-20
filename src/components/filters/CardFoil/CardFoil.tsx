"use client";

import React from "react";
// 🔥 Изменили путь импорта на локальный файл
import css from "./CardFoil.module.css"; 

interface CardFoilProps {
  selectedFoil: string | null; 
  onToggle: (value: string) => void;
}

const CardFoil = ({ selectedFoil, onToggle }: CardFoilProps) => {
  return (
    <div className={css.formContainer}>     
      <div className={css.toggleFoil}>
        
        {/* Кнопка Not Foils */}
        <label className={css.label}>
          <input
            type="checkbox"
            className={css.input}
            checked={selectedFoil === "nonfoil"}
            onChange={() => onToggle("nonfoil")}
          />
          <span className={css.notFoils}>Non-Foil</span>
        </label>

        {/* Кнопка Foils */}
        <label className={css.label}>
          <input
            type="checkbox"
            className={css.input}
            checked={selectedFoil === "foil"}
            onChange={() => onToggle("foil")}
          />
          <span className={css.foils}>Foil</span>
        </label>

      </div>
    </div>
  );
};

export default CardFoil;