// src/components/Wishlist/Wishlist.tsx
import { DbCard } from "@/types/types";
import CardItem from "@/components/cards/CardItem/CardItem";
import css from "./Wishlist.module.css";

interface Props {
  savedCards: DbCard[];
}

const Wishlist = ({ savedCards }: Props) => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Список вподобань</h2>
      
      {savedCards.length === 0 ? (
        <div className={css.emptyState}>
          <p className={css.emptyText}>Всі ваші улюблені карти в одному місці.</p>
          <p className={css.emptySubtext}>
          Почніть додавати, клацнувши маленьке сердечко - ми синхронізуємо їх на всіх ваших пристроях.
          </p>
        </div>
      ) : (
        <div className={css.grid}>
          {savedCards.map((card) => (
            <CardItem 
              key={card._id.toString()} 
              card={card} 
              variant="glass" 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;