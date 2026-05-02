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
      <h2 className={css.title}>My Wishlist</h2>
      
      {savedCards.length === 0 ? (
        <div className={css.emptyState}>
          <p className={css.emptyText}>Your wishlist is currently empty.</p>
          <p className={css.emptySubtext}>
            Find cards you love and click the heart icon to save them here.
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