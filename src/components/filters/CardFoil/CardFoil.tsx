"use client";

import React from "react";
import css from "../FiltersSidebar.module.css";

interface CardFoilProps {
  // Может быть "foil", "nonfoil" или null (если ничего не выбрано)
  selectedFoil: string | null; 
  onToggle: (value: string) => void;
}

const CardFoil = ({ selectedFoil, onToggle }: CardFoilProps) => {
  return (
    <div className={css.formContainer}>
      <h3 className={css.title}>Покриття</h3>
      
      <div className={css.toggleFoil}>
        
        {/* Кнопка Not Foils */}
        <label className={css.label}>
          <input
            type="checkbox"
            className={css.input}
            checked={selectedFoil === "nonfoil"}
            onChange={() => onToggle("nonfoil")}
          />
          <span className={css.notFoils}>Not Foils</span>
        </label>

        {/* Кнопка Foils */}
        <label className={css.label}>
          <input
            type="checkbox"
            className={css.input}
            checked={selectedFoil === "foil"}
            onChange={() => onToggle("foil")}
          />
          <span className={css.foils}>Foils</span>
        </label>

      </div>
    </div>
  );
};

export default CardFoil;