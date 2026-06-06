// components/cart/CartModal/CartModal.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import styles from "./CartModal.module.css";

export const CartModal = () => {
  const { items, isOpen, closeCart } = useCartStore();
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasScroll = items.length > 3;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>

      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Кошик ({items.length})</h2>
      </div>

      {/* ITEMS */}
      <div className={`${styles.body} ${hasScroll ? styles.bodyScroll : ""}`}>
        {items.length === 0 ? (
          <p className={styles.emptyText}>Кошик порожній</p>
        ) : (
          <div className={styles.itemsList}>
            {items.map((item) => {
              const isFullset = item.type === "fullset";

              return (
                <div key={item.id} className={styles.itemCard}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={70}
                    className={styles.itemImage}
                    // 🔹 Scryfall та інші зовнішні URL потребують unoptimized
                    unoptimized={item.image.startsWith("https://")}
                  />

                  <div className={styles.itemInfo}>
                    <p className={styles.itemName} title={item.name}>
                      {item.name}
                    </p>
                    <p className={styles.itemMeta}>
                      {/* 🔹 Для фулсету — без condition */}
                      {isFullset
                        ? item.language.toUpperCase()
                        : `${item.language.toUpperCase()}${item.condition ? ` • ${item.condition}` : ""}`
                      }
                      {item.foil && item.foil !== "nonfoil" && ` • ${item.foil}`}
                    </p>
                    <p className={styles.itemPrice}>
                      {item.quantity} × {item.price} ₴
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        {items.length > 0 && (
          <div className={styles.totalRow}>
            <span>Разом</span>
            <span>{total} ₴</span>
          </div>
        )}

        <div className={styles.actions}>
          <Button
            variant="more"
            className={styles.flexBtn}
            onClick={() => {
              closeCart();
              router.push("/cart");
            }}
            disabled={items.length === 0}
          >
            Переглянути кошик
          </Button>
          <Button
            variant="outline"
            className={styles.flexBtn}
            onClick={closeCart}
          >
            Продовжити ...
          </Button>
        </div>
      </div>
    </div>
  );
};